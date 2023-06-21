import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { TokenModule } from "../../token/token.module";
import { ConfigService } from "@nestjs/config";
import { TodoItemModule } from "../todo-item/todo-item.module";
import { TodoListModule } from "../todo-list/todo-list.module";

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
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET_KEY"),
                signOptions: {
                    expiresIn: '30d'
                }
            }),
            inject: [ConfigService]
        }),
        TodoItemModule,
        TodoListModule,
    ]
})
export class AuthModule {}