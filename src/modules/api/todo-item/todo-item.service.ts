import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TodoItem } from "./entities/todo-item.entity";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";
import { ERROR_RESPONSE_NO_FIND } from "../../../constants/response-errors.constant";
import { ERROR_TODOITEM_LIST_NOT_FOUND } from "../../../constants/todo-item.constant";
import { TodoItemAttributes, TodoItemInclude, TodoListAttributes } from "../../../configs/entities.config";
import { UpdateTodoItemDto } from "./dto/update-todo-item.dto";
import { TodoList } from "../todo-list/entities/todo-list.entity";

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

    async delete (todoItemId: number) {
        return await this.todoItemRepository.destroy({
            where: {
                id: todoItemId
            },
        })
    }

    async findOne (userId: number, todoItemId: number) {
        return await this.todoItemRepository.findOne({
            where: {
                user_id: userId,
                id: todoItemId
            },
            attributes: TodoItemAttributes,
        })
    }

    async findMany (userId: number) {
        return await this.todoItemRepository.findAll({
            where: {
                user_id: userId
            },
            attributes: TodoItemAttributes,
        })
    }

    async update (userId: number, todoItemId: number, params: UpdateTodoItemDto) {
        try {
            const todoItem: TodoItem = await this.todoItemRepository.findOne({
                where: {
                    id: todoItemId,
                    user_id: userId
                },
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