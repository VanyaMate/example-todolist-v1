import { IsString, Length } from "class-validator";
import { ERROR_IS_NOT_STRING, ERROR_LENGTH } from "../../../constants/class-validator.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ type: String, example: 'admin', description: 'Login пользователя' })
    @IsString({ message: ERROR_IS_NOT_STRING })
    @Length(3, 15, { message: ERROR_LENGTH })
    readonly login: string;

    @ApiProperty({ type: String, example: 'root123qwerty', description: 'Password пользователя' })
    @IsString({ message: ERROR_IS_NOT_STRING })
    @Length(6, 30, { message: ERROR_LENGTH })
    readonly password: string;

}