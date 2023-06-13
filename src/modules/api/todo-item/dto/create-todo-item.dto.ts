import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from "class-validator";
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

    @ApiProperty({ type: String, example: '2023-06-10T22:02:14.462Z', description: 'Дата окончания задачи' })
    @IsDateString()
    @ValidateIf((object, value) =>  value !== undefined && value !== null)
    readonly completion_date: string;

    @ApiProperty({ type: Number, example: 10, description: 'Id списка задач в которую добавить эту задачу' })
    @IsNumber({}, { message: ERROR_IS_NUMBER })
    @IsNotEmpty({ message: ERROR_IS_NOT_EMPTY })
    readonly todo_list_id: number;

}