import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Token } from "../../token/entities/token.entity";
import { TodoList } from "../../api/todo-list/entities/todo-list.entity";

export interface IUserCreationData {
    login: string;
    password: string;
}

@Table({
    tableName: 'user'
})
export class User extends Model<User, IUserCreationData> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @HasOne(() => Token)
    token: Token;

    @HasMany(() => TodoList)
    todo_lists: TodoList[]

}
