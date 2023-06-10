import { IsString, Length } from "class-validator";
import { ERROR_IS_STRING, ERROR_LENGTH } from "../../../configs/class-validator.config";

export class CreateUserDto {

    @IsString({ message: ERROR_IS_STRING })
    @Length(3, 15, { message: ERROR_LENGTH })
    readonly login: string;

    @IsString({ message: ERROR_IS_STRING })
    @Length(6, 30, { message: ERROR_LENGTH })
    readonly password: string;

}
