import { Token } from "./entities/token.entity";

export default [
    {
        provide: Token.name,
        useValue: Token,
    },
]