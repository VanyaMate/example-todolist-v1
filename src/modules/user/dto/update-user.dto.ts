import { CreateUserDto } from './create-user.dto';
import { IsString, Length } from "class-validator";
import { ERROR_IS_STRING, ERROR_LENGTH } from "../../../constants/class-validator.constant";

export class UpdateUserDto implements Partial<CreateUserDto> {

    @IsString({ message: ERROR_IS_STRING })
    @Length(6, 30, { message: ERROR_LENGTH })
    readonly password: string;

}
