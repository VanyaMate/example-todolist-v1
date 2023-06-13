import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import {
    ERROR_IS_NOT_EMPTY,
    ERROR_IS_NUMBER,
    ERROR_IS_STRING,
    ERROR_LENGTH
} from "../../../../constants/class-validator.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoItemDto {

    @ApiProperty({ type: String, example: 'Добавить swagger', description: 'Заголовок задачи' })
    @Length(3, 30, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    readonly title: string;

    @ApiProperty({ type: String, example: 'Установить зависимость, добавить декораторы', description: 'Описание задачи' })
    @Length(0, 100, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    readonly description: string;

    @ApiProperty({ type: Number, example: 10, description: 'Id списка задач в которую добавить эту задачу' })
    @IsNumber({}, { message: ERROR_IS_NUMBER })
    @IsNotEmpty({ message: ERROR_IS_NOT_EMPTY })
    readonly todo_list_id: number;

}