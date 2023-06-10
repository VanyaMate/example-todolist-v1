import {User} from "./entities/user.entity";
import {REPOSITORY_USER} from "../../configs/repositories-names.config";

export const userProviders = [
    {
        provide: REPOSITORY_USER,
        useValue: User,
    },
];