import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TodoItem } from "./entities/todo-item.entity";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";
import { ERROR_RESPONSE_NO_FIND } from "../../../constants/response-errors.constant";
import { ERROR_TODOITEM_LIST_NOT_FOUND } from "../../../constants/todo-item.constant";
import { TodoItemAttributes, TodoItemInclude, TodoListAttributes } from "../../../configs/entities.config";
import { UpdateTodoItemDto } from "./dto/update-todo-item.dto";
import { TodoList } from "../todo-list/entities/todo-list.entity";
import { IMultiplyResponse, ISearchOptions } from "../api.interface";
import { WhereOptions } from "sequelize";

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
            throw new HttpException({ message: ERROR_TODOITEM_LIST_NOT_FOUND }, HttpStatus.NOT_FOUND);
        }
    }

    async delete (where: WhereOptions<TodoItem>) {
        return await this.todoItemRepository.destroy({ where })
    }

    async findOne (where: WhereOptions<TodoItem>) {
        return await this.todoItemRepository.findOne({
            where,
            attributes: TodoItemAttributes,
        })
    }

    async findMany (where: WhereOptions<TodoItem>, searchOptions: ISearchOptions<TodoItem> = {}): Promise<IMultiplyResponse<TodoItem>> {
        const count: number = await this.todoItemRepository.count({ where });
        const todoItems: TodoItem[] = await this.todoItemRepository.findAll({
            where,
            attributes: TodoItemAttributes,
            ...searchOptions,
        })

        console.log(where);

        return {
            list: todoItems,
            count: count,
            options: searchOptions,
        }
    }

    async update (where: WhereOptions<TodoItem>, params: UpdateTodoItemDto) {
        try {
            const todoItem: TodoItem = await this.todoItemRepository.findOne({
                where,
                attributes: TodoItemAttributes,
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