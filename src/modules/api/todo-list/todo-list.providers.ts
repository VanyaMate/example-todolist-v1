import { TodoList } from "./entities/todo-list.entity";

export default [
    {
        provide: TodoList.name,
        useValue: TodoList,
    },
]