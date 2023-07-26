import { TodoItem } from "../modules/api/todo-item/entities/todo-item.entity";
import { TodoList } from "../modules/api/todo-list/entities/todo-list.entity";
import { Token } from "../modules/token/entities/token.entity";

export const TokenAttributes = ['token'];
export const TokenInclude = {
        model: Token,
        attributes: TokenAttributes
};

export const TodoItemAttributes = ['id', 'title', 'description', 'status', 'createdAt', 'updatedAt', 'completion_date', 'todo_list_id'];
export const TodoItemInclude = {
    model: TodoItem,
    attributes: TodoItemAttributes,
    limit: 10,
}

export const TodoListAttributes = ['id', 'title', 'description', 'createdAt', 'updatedAt', 'colorHex'];
export const TodoListInclude = {
    model: TodoList,
    attributes: TodoListAttributes,
    limit: 10,
    include: [TodoItemInclude]
}