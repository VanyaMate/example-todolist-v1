import { ApiProperty, ApiQuery } from "@nestjs/swagger";

export class TodoItemSwagger {

    @ApiProperty({ type: Number, example: 14, description: 'Id задачи' })
    id: number;

    @ApiProperty({ type: String, example: 'Добавить swagger', description: 'Заголовок задачи' })
    title: string;

    @ApiProperty({ type: String, example: 'Установить зависимость, добавить декораторы', description: 'Описание задачи' })
    description: number;

    @ApiProperty({ type: Date, example: '2023-16-10T23:01:21.142Z', description: 'Дата завершения задачи' })
    completion_date: string;

    @ApiProperty({ type: Boolean, example: true, description: 'Статус задачи' })
    status: boolean;

    @ApiProperty({ type: Date, example: '2023-06-10T22:02:14.462Z', description: 'Дата создания задачи' })
    createdAt: string;

    @ApiProperty({ type: Date, example: '2023-06-11T03:42:02.008Z', description: 'Дата последнего обновления задачи' })
    updatedAt: string;

}

export class TodoListSwagger {

    @ApiProperty({ type: Number, example: 6, description: 'Id списка задач' })
    id: number;

    @ApiProperty({ type: String, example: 'Интеграция swagger', description: 'Заголовок списка задач' })
    title: string;

    @ApiProperty({ type: String, example: 'Список действий по интеграции swagger', description: 'Описание списка задач' })
    description: number;

    @ApiProperty({ type: Date, example: '2023-06-11T21:20:50.467Z', description: 'Дата создания списка задач' })
    createdAt: number;

    @ApiProperty({ type: Date, example: '2023-06-11T21:20:51.235Z', description: 'Дата последнего обновления списка задач' })
    updatedAt: number;

    @ApiProperty({ type: [TodoItemSwagger] })
    todo_items: TodoItemSwagger[];

}

export class UserSwagger {

    @ApiProperty({ type: Number, example: 1, description: 'Id пользователя' })
    id: number;

    @ApiProperty({ type: String, example: 'admin', description: 'Login пользователя' })
    login: number;

    @ApiProperty({ type: Date, example: '2023-06-11T21:52:43.819Z', description: 'Дата создания пользователя' })
    createdAt: number;

    @ApiProperty({ type: Date, example: '2023-06-11T21:52:43.819Z', description: 'Дата последнего обновления пользователя' })
    updatedAt: number;

    @ApiProperty({ type: [TodoListSwagger] })
    todo_lists: TodoListSwagger[];

}

export class LogoutSwagger {

    @ApiProperty({ type: Boolean, example: true, description: 'Выход' })
    logout: boolean;

}

export class ResponseUnauthorizedSwagger {

    @ApiProperty({ type: String, example: 'Нет доступа', description: 'Текст ошибки' })
    message: string;

}

export class SearchOptionsSwagger {

    limit: string;

}

export const SWAGGER_JWT_EXAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2Vzc2lvblRva2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';