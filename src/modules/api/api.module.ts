import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TodoListModule } from "./todo-list/todo-list.module";
import { TodoItemModule } from "./todo-item/todo-item.module";

@Module({
    imports: [
        AuthModule,
        TodoListModule,
        TodoItemModule,
    ]
})
export class ApiModule {}