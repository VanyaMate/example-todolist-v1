import { UserService } from '../../user/user.service';
import { TokenService } from '../../token/token.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ERROR_RESPONSE_NO_ACCESS } from '../../../constants/response-errors.constant';
import { UserPrivate } from '../../user/user.interface';
import { ConfigService } from '@nestjs/config';
import { AuthData } from './auth.interface';
import { TodoItemService } from '../todo-item/todo-item.service';
import { IMultiplyResponse } from '../api.interface';
import { TodoListService } from '../todo-list/todo-list.service';
import { TodoList } from '../todo-list/entities/todo-list.entity';
import { TokenInclude } from '../../../configs/entities.config';


@Injectable()
export class AuthService {

    constructor (private userService: UserService,
                 private tokenService: TokenService,
                 private jwtService: JwtService,
                 private configService: ConfigService,
                 private todoItemService: TodoItemService,
                 private todoListService: TodoListService) {
    }

    async registration (createUserDto: CreateUserDto): Promise<{
        user: AuthData,
        jwtToken: string
    }> {
        try {
            const user: User       = await this.userService.create(createUserDto);
            const token: string    = await this.tokenService.create(user.id);
            const jwtToken: string = this.jwtService.sign({
                id          : user.id,
                sessionToken: token,
            });
            return {
                user: {
                    user      : this.userService.toPrivate(user),
                    todo_lists: [],
                },
                jwtToken,
            };
        } catch (e) {
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
                id          : user.id,
                sessionToken: user.token.token,
            });

            const userPrivate: UserPrivate = this.userService.toPrivate(user);
            const todoList: TodoList[]     = await this._getTodoData(user);

            return {
                user: {
                    user      : userPrivate,
                    todo_lists: todoList,
                },
                jwtToken,
            };
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    async refresh (userId: number): Promise<AuthData> {
        try {
            const user: User               = await this.userService.findOne({ id: userId });
            const userPrivate: UserPrivate = this.userService.toPrivate(user);
            const todoList: TodoList[]     = await this._getTodoData(user);

            return {
                user      : userPrivate,
                todo_lists: todoList,
            };
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    private async _getTodoData (user: User): Promise<TodoList[]> {
        const todoLists: IMultiplyResponse<TodoList> = await this.todoListService.findMany({
            user_id: user.id,
        }, {
            limit: 30,
            order: [ [ 'createdAt', 'asc' ] ],
        });

        return todoLists.list;
    }

}