import { Inject, Injectable } from "@nestjs/common";
import { Token } from "./entities/token.entity";
import { randomUUID } from "crypto";

@Injectable()
export class TokenService {

    constructor(@Inject(Token.name) private tokenRepository: typeof Token) {}

    async create (userId: number): Promise<string> {
        const randomToken: string = randomUUID();
        const token: Token = await this.tokenRepository.create({
            token: randomToken,
            user_id: userId,
        })
        return randomToken;
    }

    async validateByUserId (userId: number, userToken: string): Promise<boolean> {
        const token: Token = await this.tokenRepository.findOne({
            where: {
                user_id: userId
            }
        })
        return token.token === userToken;
    }

    async refresh (userId: number): Promise<string> {
        const token: Token = await this.tokenRepository.findOne({
            where: {
                user_id: userId
            }
        })
        const randomToken = randomUUID();
        await token.update({ token: randomToken });
        return randomToken;
    }

    async delete (userId: number): Promise<boolean> {
        const token: Token = await this.tokenRepository.findOne({
            where: {
                user_id: userId
            }
        })
        if (token) {
            await token.destroy();
            return true;
        } else {
            return false;
        }
    }

}