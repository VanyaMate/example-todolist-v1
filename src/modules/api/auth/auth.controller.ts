import { Body, Controller, Get, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { COOKIE_ACCESS_TOKEN } from "../../../configs/cookies.config";
import { Response } from 'express';
import { getMsDays } from "../../../helpers/utils.helper";
import { AccessTokenGuard } from "../../../guards/access-token.guard";

@Controller('/api/auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    @UsePipes(ClassValidatorPipe)
    async login (@Body() createUserDto: CreateUserDto,
                 @Res() res: Response) {
        const { user, jwtToken } = await this.authService.login(createUserDto);
        res.cookie(COOKIE_ACCESS_TOKEN, jwtToken, {
            httpOnly: true,
            maxAge: getMsDays(30)
        })
        res.status(200).json(user);
    }

    @Post('/registration')
    @UsePipes(ClassValidatorPipe)
    async registration (@Body() createUserDto: CreateUserDto,
                        @Res() res: Response) {
        const { user, jwtToken } = await this.authService.registration(createUserDto);
        res.cookie(COOKIE_ACCESS_TOKEN, jwtToken, {
            httpOnly: true,
            maxAge: getMsDays(30)
        })
        res.status(200).json(user);
    }

    @Get('/logout')
    @UseGuards(AccessTokenGuard)
    logout (@Res() res: Response) {
        res.clearCookie(COOKIE_ACCESS_TOKEN);
        res.status(200).json({ logout: true })
    }

}