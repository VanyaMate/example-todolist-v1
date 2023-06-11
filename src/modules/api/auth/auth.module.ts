import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { TokenModule } from "../../token/token.module";

@Module({
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
    imports: [
        UserModule,
        TokenModule,
        JwtModule,
    ]
})
export class AuthModule {}