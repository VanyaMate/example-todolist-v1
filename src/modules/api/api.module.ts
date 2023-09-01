import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoItemModule } from './todo-item/todo-item.module';


@Module({
    imports: [
        AuthModule,
        TodoListModule,
        TodoItemModule,
        TagsModule,
    ],
})
export class ApiModule {
}