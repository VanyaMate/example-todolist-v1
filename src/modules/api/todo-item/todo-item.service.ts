import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TodoItem } from "./entities/todo-item.entity";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";
import { ERROR_RESPONSE_NO_FIND } from "../../../constants/response-errors.constant";
import { ERROR_NOT_FOUND } from "../../../constants/todo-item.constant";
import { TodoItemAttributes, TodoItemInclude, TodoListAttributes } from "../../../configs/entities.config";
import { UpdateTodoItemDto } from "./dto/update-todo-item.dto";
import { TodoList } from "../todo-list/entities/todo-list.entity";
import { IMultiplyResponse, ISearchOptions } from "../api.interface";
import { Op, WhereOptions } from "sequelize";
import { Includeable } from "sequelize/types/model";
import { TodoListService } from "../todo-list/todo-list.service";

@Injectable()
export class TodoItemService {

    constructor(@Inject(TodoItem.name) private todoItemRepository: typeof TodoItem,
                private readonly todoListService: TodoListService) {}

    async create (userId: number, createTodoItemDto: CreateTodoItemDto) {
        try {
            if ((createTodoItemDto.todo_list_id ?? null) !== null) {
                const todoList: TodoList = await this.todoListService.findOne({ id: createTodoItemDto.todo_list_id });
                if (!todoList) {
                    return await this.todoItemRepository.create({
                        ...createTodoItemDto,
                        user_id: userId,
                        todo_list_id: null,
                    })
                }
            }

            return await this.todoItemRepository.create({
                ...createTodoItemDto,
                user_id: userId,
            })
        }
        catch (e) {
            throw new HttpException({ message: ERROR_NOT_FOUND }, HttpStatus.NOT_FOUND);
        }
    }

    async delete (where: WhereOptions<TodoItem>) {
        try {
            return await this.todoItemRepository.destroy({ where })
        }
        catch (e) {
            throw new HttpException({ message: ERROR_NOT_FOUND }, HttpStatus.NOT_FOUND);
        }
    }

    async findOne (where: WhereOptions<TodoItem>, include: Includeable[] = []) {
        try {
            return await this.todoItemRepository.findOne({
                where,
                attributes: TodoItemAttributes,
                include,
            })
        }
        catch (e) {
            throw new HttpException({ message: ERROR_NOT_FOUND }, HttpStatus.NOT_FOUND);
        }
    }

    async findMany (where: WhereOptions<TodoItem>, searchOptions: ISearchOptions<TodoItem> = {}, include: Includeable[] = []): Promise<IMultiplyResponse<TodoItem>> {
        try {
            const count: number = await this.todoItemRepository.count({ where });
            const todoItems: TodoItem[] = await this.todoItemRepository.findAll({
                where,
                include,
                ...searchOptions,
                attributes: TodoItemAttributes,
            })

            return {
                list: todoItems,
                count: count,
                options: searchOptions,
            }
        }
        catch (_) {
            return {
                list: [],
                count: 0,
                options: searchOptions,
            }
        }
    }

    async update (where: WhereOptions<TodoItem>, params: UpdateTodoItemDto, include: Includeable[] = []) {
        try {
            const todoItem: TodoItem = await this.todoItemRepository.findOne({
                where,
                attributes: TodoItemAttributes,
                include,
            });

            if (todoItem) {
                if ((params.todo_list_id ?? null) !== null) {
                    const todoList: TodoList = await this.todoListService.findOne({ id: params.todo_list_id });
                    if (!todoList) {
                        return await todoItem.update({
                            ...params,
                            todo_list_id: null,
                        })
                    }
                }

                return await todoItem.update(params);
            }

            throw { message: ERROR_RESPONSE_NO_FIND };
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
    }

    async getOverdue (userId: number, searchOptions: ISearchOptions<TodoItem> = {}, include: Includeable[] = []): Promise<IMultiplyResponse<TodoItem>> {
        return await this.findMany({
            user_id: userId,
            completion_date: {
                [Op.between]: [new Date(0), new Date()]
            },
            status: false
        }, searchOptions, include)
    }

    async getCompleted (userId: number, searchOptions: ISearchOptions<TodoItem> = {}, include: Includeable[] = []): Promise<IMultiplyResponse<TodoItem>> {
        return await this.findMany({
            user_id: userId,
            status: true
        }, searchOptions, include)
    }

    async getToday (userId: number, searchOptions: ISearchOptions<TodoItem> = {}, include: Includeable[] = []): Promise<IMultiplyResponse<TodoItem>> {
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

        return await this.findMany({
            user_id: userId,
            status: false,
            completion_date: {
                [Op.between]: [startDay, finishDay],
            }
        }, {
            limit: 100,
            order: [["completion_date", "asc"]],
            ...searchOptions
        }, include)
    }

    async getUpcoming (userId: number, searchOptions: ISearchOptions<TodoItem> = {}, include: Includeable[] = []): Promise<IMultiplyResponse<TodoItem>> {
        const currentTime = new Date();
        const upcomingTime = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            currentTime.getHours() + 3,
            currentTime.getMinutes(),
            currentTime.getSeconds(),
            currentTime.getMilliseconds(),
        );

        return await this.findMany({
            user_id: userId,
            status: false,
            completion_date: {
                [Op.between]: [currentTime, upcomingTime],
            }
        }, {
            limit: 100,
            order: [["completion_date", "asc"]],
            ...searchOptions
        }, include)
    }
}