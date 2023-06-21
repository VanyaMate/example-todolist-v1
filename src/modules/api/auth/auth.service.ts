import { UserService } from "../../user/user.service";
import { TokenService } from "../../token/token.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { User } from "../../user/entities/user.entity";
import { Token } from "../../token/entities/token.entity";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ERROR_RESPONSE_NO_ACCESS } from "../../../constants/response-errors.constant";
import { UserPrivate } from "../../user/user.interface";
import { ConfigService } from "@nestjs/config";
import { AuthData, TodoItemsData } from "./auth.interface";
import { TodoItemService } from "../todo-item/todo-item.service";
import { IMultiplyResponse } from "../api.interface";
import { TodoItem } from "../todo-item/entities/todo-item.entity";
import { Op } from "sequelize";
import { TodoListService } from "../todo-list/todo-list.service";
import { TodoList } from "../todo-list/entities/todo-list.entity";
import { TokenInclude } from "../../../configs/entities.config";

@Injectable()
export class AuthService {

    constructor (private userService: UserService,
                 private tokenService: TokenService,
                 private jwtService: JwtService,
                 private configService: ConfigService,
                 private todoItemService: TodoItemService,
                 private todoListService: TodoListService,) {}

    async registration (createUserDto: CreateUserDto): Promise<{ user: AuthData, jwtToken: string }> {
        try {
            const user: User = await this.userService.create(createUserDto);
            const token: string = await this.tokenService.create(user.id);
            const jwtToken: string = this.jwtService.sign({
                id: user.id,
                sessionToken: token,
            });
            return {
                user: {
                    user: this.userService.toPrivate(user),
                    todo_items: {
                        all: 0,
                        overdue: 0,
                        today: [],
                        upcoming: [],
                        completed: 0,
                    },
                    todo_lists: []
                },
                jwtToken,
            }
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async login (createUserDto: CreateUserDto): Promise<{ user: AuthData, jwtToken: string }> {
        try {
            const user: User = await this.userService.findOne({ login: createUserDto.login }, [ TokenInclude ]);
            if (!user) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            const valid: boolean = bcrypt.compareSync(createUserDto.password, user.password);
            if (!valid) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            const jwtToken: string = this.jwtService.sign({
                id: user.id,
                sessionToken: user.token.token,
            });

            const userPrivate: UserPrivate = this.userService.toPrivate(user);
            const [todoData, todoList]: [TodoItemsData, TodoList[]] = await this._getTodoData(user);

            return {
                user: {
                    user: userPrivate,
                    todo_items: todoData,
                    todo_lists: todoList,
                },
                jwtToken,
            }
        }
        catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    async refresh (userId: number): Promise<AuthData> {
        try {
            const user: User = await this.userService.findOne({ id: userId });
            const userPrivate: UserPrivate = this.userService.toPrivate(user);
            const [todoData, todoList]: [TodoItemsData, TodoList[]] = await this._getTodoData(user);

            return {
                user: userPrivate,
                todo_items: todoData,
                todo_lists: todoList,
            }
        }
        catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    private async _getTodoData (user: User): Promise<[TodoItemsData, TodoList[]]> {
        const currentTime = new Date();
        const startDay = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            0,
            0,
            0,
        );
        const finishDay = new Date(
            startDay.getFullYear(),
            startDay.getMonth(),
            startDay.getDate(),
            23,
            59,
            59
        );
        const upcomingTime = new Date(
            startDay.getFullYear(),
            startDay.getMonth(),
            startDay.getDate(),
            currentTime.getHours() + 3,
            currentTime.getMinutes(),
            currentTime.getSeconds(),
            currentTime.getMilliseconds(),
        );
        const items: IMultiplyResponse<TodoItem> = await this.todoItemService.findMany({ user_id: user.id });
        const overdue: IMultiplyResponse<TodoItem> = await this.todoItemService.findMany({
            user_id: user.id,
            completion_date: {
                [Op.between]: [new Date(user.createdAt), new Date()]
            },
            status: false
        })
        const completed: IMultiplyResponse<TodoItem> = await this.todoItemService.findMany({
            user_id: user.id,
            status: true
        })
        const today: IMultiplyResponse<TodoItem> = await this.todoItemService.findMany({
            user_id: user.id,
            status: false,
            completion_date: {
                [Op.between]: [startDay, finishDay],
            }
        }, {
            limit: 100,
            order: [["completion_date", "asc"]]
        })
        const upcoming: IMultiplyResponse<TodoItem> = await this.todoItemService.findMany({
            user_id: user.id,
            status: false,
            completion_date: {
                [Op.between]: [currentTime, upcomingTime],
            }
        }, {
            limit: 100,
            order: [["completion_date", "asc"]]
        })

        const todoLists: IMultiplyResponse<TodoList> = await this.todoListService.findMany({
            user_id: user.id,
        }, {
            limit: 30,
        })

        return [
            {
                overdue: overdue.count,
                all: items.count,
                completed: completed.count,
                today: today.list,
                upcoming: upcoming.list,
            },
            todoLists.list
        ]
    }

}