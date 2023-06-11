import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { COOKIE_ACCESS_USER_ID } from "../constants/cookies.constant";

export interface IUserVerifiedData {
    id: number,
}

export const UserVerified = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userVerifiedData: IUserVerifiedData = {
            id: Number(request[COOKIE_ACCESS_USER_ID]),
        };

        return userVerifiedData;
    },
);