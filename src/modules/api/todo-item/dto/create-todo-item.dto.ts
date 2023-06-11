import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import {
    ERROR_IS_NOT_EMPTY,
    ERROR_IS_NUMBER,
    ERROR_IS_STRING,
    ERROR_LENGTH
} from "../../../../constants/class-validator.constant";

export class CreateTodoItemDto {

    @Length(3, 30, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    readonly title: string;

    @Length(0, 100, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    readonly description: string;

    @IsNumber({}, { message: ERROR_IS_NUMBER })
    @IsNotEmpty({ message: ERROR_IS_NOT_EMPTY })
    readonly todo_list_id: number;

}