import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { Request } from 'express';
import { ISearchOptions } from "../modules/api/api.interface";
import { getSortParams } from "../helpers/utils.helper";

export const SearchOptions = createParamDecorator(
    <T>(data: string, ctx: ExecutionContext): ISearchOptions<T> => {
        const request: Request = ctx.switchToHttp().getRequest();
        const query = request.query;

        return {
            order: getSortParams((query['order'] as string ?? '').split(',')),
            limit: Number(query['limit'] as string ?? 10),
            offset: Number(query['offset'] as string ?? 0),
        }
    },
);