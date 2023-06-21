import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TodoItem } from "./entities/todo-item.entity";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";
import { ERROR_RESPONSE_NO_FIND } from "../../../constants/response-errors.constant";
import { ERROR_NOT_FOUND } from "../../../constants/todo-item.constant";
import { TodoItemAttributes, TodoItemInclude, TodoListAttributes } from "../../../configs/entities.config";
import { UpdateTodoItemDto } from "./dto/update-todo-item.dto";
import { TodoList } from "../todo-list/entities/todo-list.entity";
import { IMultiplyResponse, ISearchOptions } from "../api.interface";
import { WhereOptions } from "sequelize";
import { Includeable } from "sequelize/types/model";

@Injectable()
export class TodoItemService {

    constructor(@Inject(TodoItem.name) private todoItemRepository: typeof TodoItem) {}

    async create (userId: number, createTodoItemDto: CreateTodoItemDto) {
        try {
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
                return await todoItem.update(params);
            }

            throw { message: ERROR_RESPONSE_NO_FIND };
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
    }

}