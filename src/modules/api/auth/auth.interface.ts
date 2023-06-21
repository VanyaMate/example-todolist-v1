import { UserPrivate } from "../../user/user.interface";

export type TodoData = {
    overdue: number,
    upcoming: string[],
    today: string[],

    all: number,
    completed: number,
}

export type AuthData = {
    user: UserPrivate,
    todo: TodoData
}