import { IsArray, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import {
    ERROR_IS_NOT_EMPTY,
    ERROR_IS_NOT_NUMBER,
    ERROR_IS_NOT_STRING,
    ERROR_LENGTH
} from "../../../../constants/class-validator.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoListDto {

    @ApiProperty({ type: String, example: 'Интеграция swagger', description: 'Заголовок списка задач' })
    @Length(3, 30, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_NOT_STRING })
    readonly title: string;

    @ApiProperty({ type: String, example: 'Список действий по интеграции swagger', description: 'Описание списка задач' })
    @Length(0, 100, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_NOT_STRING })
    readonly description: string;

}