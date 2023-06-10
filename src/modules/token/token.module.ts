import { Module } from "@nestjs/common";
import { Token } from "./entities/token.entity";
import tokenProviders from "./token.providers";
import { TokenService } from "./token.service";

@Module({
    providers: [
        TokenService,
        ...tokenProviders,
    ],
    exports: [
        TokenService,
    ]
})
export class TokenModule {}