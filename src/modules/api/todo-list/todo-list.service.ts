import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TodoList } from "./entities/todo-list.entity";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { TodoItem } from "../todo-item/entities/todo-item.entity";
import { TodoItemInclude, TodoListAttributes, TodoListInclude } from "../../../configs/entities.config";
import { ERROR_RESPONSE_NO_FIND } from "../../../constants/response-errors.constant";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";

@Injectable()
export class TodoListService {

    constructor(@Inject(TodoList.name) private todoListRepository: typeof TodoList) {}

    async create (userId: number, createTodoListDto: CreateTodoListDto) {
        return await this.todoListRepository.create({
            ...createTodoListDto,
            user_id: userId,
        })
    }

    async delete (todoListId: number) {
        return await this.todoListRepository.destroy({
            where: {
                id: todoListId
            }
        })
    }

    async findOne (userId: number, todoListId: number) {
        return await this.todoListRepository.findOne({
            where: {
                user_id: userId,
                id: todoListId
            },
            attributes: TodoListAttributes,
            include: [
                TodoItemInclude
            ]
        })
    }

    async findMany (userId: number) {
        return await this.todoListRepository.findAll({
            where: {
                user_id: userId
            },
            attributes: TodoListAttributes,
            include: [
                TodoItemInclude
            ]
        })
    }

    async update (userId: number, todoListId: number, params: UpdateTodoListDto) {
        try {
            const todoList: TodoList = await this.todoListRepository.findOne({
                where: {
                    id: todoListId,
                    user_id: userId
                },
                attributes: TodoListAttributes,
                include: [
                    TodoItemInclude
                ]
            });

            if (todoList) {
                return await todoList.update(params);
            }

            throw { message: ERROR_RESPONSE_NO_FIND };
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
    }

}