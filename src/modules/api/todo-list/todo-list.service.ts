import { Inject, Injectable } from "@nestjs/common";
import { TodoList } from "./entities/todo-list.entity";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { TodoItem } from "../todo-item/entities/todo-item.entity";
import { TodoItemInclude, TodoListAttributes } from "../../../configs/entities.config";

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

    async update () {

    }

}