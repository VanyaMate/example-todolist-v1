import {User} from "./entities/user.entity";

export const userProviders = [
    {
        provide: User.name,
        useValue: User,
    },
];