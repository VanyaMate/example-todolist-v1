import { Module } from "@nestjs/common";
import { TodoListController } from "./todo-list.controller";
import { TodoListService } from "./todo-list.service";
import todoListProviders from "./todo-list.providers";
import { TokenModule } from "../../token/token.module";

@Module({
    controllers: [
        TodoListController,
    ],
    providers: [
        TodoListService,
        ...todoListProviders,
    ],
    imports: [
        TokenModule,
    ]
})
export class TodoListModule {}