import { UserPrivate } from "../../user/user.interface";
import { TodoList } from "../todo-list/entities/todo-list.entity";
import { TodoItem } from "../todo-item/entities/todo-item.entity";

export type TodoItemsData = {
    overdue: number,
    upcoming: TodoItem[],
    today: TodoItem[],

    all: number,
    completed: number,
}

export type AuthData = {
    user: UserPrivate,
    todo_items: TodoItemsData,
    todo_lists: TodoList[],
}