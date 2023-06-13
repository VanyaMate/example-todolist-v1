import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TodoList } from "./entities/todo-list.entity";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { TodoItemInclude, TodoListAttributes, TodoListInclude } from "../../../configs/entities.config";
import { ERROR_RESPONSE_NO_FIND } from "../../../constants/response-errors.constant";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";
import { IMultiplyResponse, ISearchOptions } from "../api.interface";
import { WhereOptions } from "sequelize";

@Injectable()
export class TodoListService {

    constructor(@Inject(TodoList.name) private todoListRepository: typeof TodoList) {}

    async create (userId: number, createTodoListDto: CreateTodoListDto) {
        return await this.todoListRepository.create({
            ...createTodoListDto,
            user_id: userId,
        })
    }

    async delete (where: WhereOptions<TodoList>) {
        try {
            return await this.todoListRepository.destroy({ where })
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
    }

    async findOne (where: WhereOptions<TodoList>) {
        try {
            return await this.todoListRepository.findOne({
                where,
                attributes: TodoListAttributes,
                include: [
                    TodoItemInclude
                ]
            })
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.NOT_FOUND);
        }
    }

    async findMany (where: WhereOptions<TodoList>, searchOptions: ISearchOptions<TodoList> = {}): Promise<IMultiplyResponse<TodoList>> {
        try {
            const count: number = await this.todoListRepository.count({ where });
            const todoLists: TodoList[] = await this.todoListRepository.findAll({
                where,
                attributes: TodoListAttributes,
                include: [
                    TodoItemInclude,
                ],
                ...searchOptions,
            })

            return {
                list: todoLists,
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

    async update (where: WhereOptions<TodoList>, params: UpdateTodoListDto) {
        try {
            const todoList: TodoList = await this.todoListRepository.findOne({
                where,
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