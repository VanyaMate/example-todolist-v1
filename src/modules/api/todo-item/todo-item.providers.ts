import { TodoItem } from "./entities/todo-item.entity";

export default [
    {
        provide: TodoItem.name,
        useValue: TodoItem,
    },
]