import { IsArray, IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from "class-validator";
import {
    ERROR_IS_NOT_EMPTY,
    ERROR_IS_NUMBER,
    ERROR_IS_STRING,
    ERROR_LENGTH
} from "../../../../constants/class-validator.constant";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTodoListDto {

    @ApiProperty({ type: String, example: 'Интеграция swagger', description: 'Заголовок списка задач' })
    @Length(3, 30, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    @ValidateIf((object, value) => value !== undefined && value !== null)
    readonly title: string;

    @ApiProperty({ type: String, example: 'Список действий по интеграции swagger', description: 'Описание списка задач' })
    @Length(0, 100, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    @ValidateIf((object, value) => value !== undefined && value !== null)
    readonly description: string;

}