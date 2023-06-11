import { IsBoolean, IsString, Length, ValidateIf } from "class-validator";
import { ERROR_IS_NOT_BOOLEAN, ERROR_IS_STRING, ERROR_LENGTH } from "../../../../constants/class-validator.constant";

export class UpdateTodoItemDto {

    @Length(3, 30, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    @ValidateIf((object, value) => value !== undefined && value !== null)
    readonly title: string;

    @Length(0, 100, { message: ERROR_LENGTH })
    @IsString({ message: ERROR_IS_STRING })
    @ValidateIf((object, value) =>  value !== undefined && value !== null)
    readonly description: string;

    @IsBoolean({ message: ERROR_IS_NOT_BOOLEAN })
    @ValidateIf((object, value) =>  value !== undefined && value !== null)
    readonly status: boolean;

}