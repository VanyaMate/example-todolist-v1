import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { COOKIE_ACCESS_TOKEN, COOKIE_ACCESS_USER_ID } from "../configs/cookies.config";
import { JwtService } from "@nestjs/jwt";
import { ERROR_RESPONSE_NO_ACCESS } from "../configs/response-errors.config";
import { TokenService } from "../modules/token/token.service";
import { ConfigService } from "@nestjs/config";
import { config } from "rxjs";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private tokenService: TokenService,
                private configService: ConfigService,) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        try {
            const accessToken = req.cookies?.[COOKIE_ACCESS_TOKEN];
            if (!accessToken) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            const verified = this.jwtService.verify(accessToken, {
                secret: this.configService.get<string>("JWT_SECRET_KEY")
            });

            if (!verified) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            const { id, sessionToken } = verified;
            const valid: boolean = await this.tokenService.validateByUserId(id, sessionToken);

            if (!valid) {
                throw { message: ERROR_RESPONSE_NO_ACCESS };
            }

            req[COOKIE_ACCESS_USER_ID] = id;
            return true;
        }
        catch (e) {
            console.log(e);
            throw new UnauthorizedException(e);
        }
    }
}