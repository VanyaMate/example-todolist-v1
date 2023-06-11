import { UserService } from "../../user/user.service";
import { TokenService } from "../../token/token.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { User } from "../../user/entities/user.entity";
import { Token } from "../../token/entities/token.entity";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ERROR_RESPONSE_NO_ACCESS } from "../../../constants/response-errors.constant";
import { UserPrivate } from "../../user/user.interface";

@Injectable()
export class AuthService {

    constructor (private userService: UserService,
                 private tokenService: TokenService,
                 private jwtService: JwtService) {}

    async registration (createUserDto: CreateUserDto): Promise<{ user: UserPrivate, jwtToken: string }> {
        try {
            const user: User = await this.userService.create(createUserDto);
            const token: string = await this.tokenService.create(user.id);
            const jwtToken: string = this.jwtService.sign({
                id: user.id,
                sessionToken: token,
            }, {

            });
            return {
                user: this.userService.toPrivate(user),
                jwtToken,
            }
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async login (createUserDto: CreateUserDto): Promise<{ user: UserPrivate, jwtToken: string }> {
        try {
            const user: User = await this.userService.findByLogin(createUserDto.login);
            if (!user) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            const valid: boolean = bcrypt.compareSync(createUserDto.password, user.password);
            if (!valid) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            const jwtToken: string = this.jwtService.sign({
                id: user.id,
                sessionToken: user.token.token,
            });

            return {
                user: this.userService.toPrivate(user),
                jwtToken,
            }
        }
        catch (e) {
            throw new UnauthorizedException(e).getResponse();
        }
    }

}