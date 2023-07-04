import { IsBoolean, IsNumber, IsString, Length, ValidateIf } from "class-validator";
import {
    ERROR_IS_NOT_BOOLEAN,
    ERROR_IS_NOT_NUMBER,
    ERROR_IS_NOT_STRING,
    ERROR_LENGTH
} from "../../../../constants/class-validator.constant";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTodoItemDto {

    @ApiProperty({ type: String, example: 'Добавить swagger', description: 'Заголовок задачи' })
    @Length(3, 30, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_NOT_STRING })
    @ValidateIf((object, value) => value !== undefined && value !== null)
    readonly title: string;

    @ApiProperty({ type: String, example: 'Установить зависимость, добавить декораторы', description: 'Описание задачи' })
    @Length(0, 100, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_NOT_STRING })
    @ValidateIf((object, value) =>  value !== undefined && value !== null)
    readonly description: string;

    @ApiProperty({ type: Boolean, example: true, description: 'Статус задачи' })
    @IsBoolean({ message: ERROR_IS_NOT_BOOLEAN })
    @ValidateIf((object, value) =>  value !== undefined && value !== null)
    readonly status: boolean;

    @ApiProperty({ type: Boolean, example: true, description: 'Статус задачи' })
    @IsNumber({}, { message: ERROR_IS_NOT_NUMBER })
    @ValidateIf((object, value) => value !== undefined && value !== null)
    readonly todo_list_id: number;

}