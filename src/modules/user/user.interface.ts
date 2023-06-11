import { User } from "./entities/user.entity";

export type UserPrivate = Omit<User, keyof { token: any, password }>;