import { Module } from "@nestjs/common";
import { TodoItemController } from "./todo-item.controller";
import { TodoItemService } from "./todo-item.service";
import todoItemProviders from "./todo-item.providers";
import { TokenModule } from "../../token/token.module";
import { JwtModule } from "@nestjs/jwt";
import { TodoListModule } from "../todo-list/todo-list.module";

@Module({
    controllers: [
        TodoItemController,
    ],
    providers: [
        TodoItemService,
        ...todoItemProviders,
    ],
    imports: [
        TokenModule,
        JwtModule,
        TodoListModule,
    ],
    exports: [
        TodoItemService,
    ]
})
export class TodoItemModule {}