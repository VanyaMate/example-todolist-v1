import { Model, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { User } from "../../../user/entities/user.entity";
import { TodoList } from "../../todo-list/entities/todo-list.entity";

interface TodoItemCreate {
    title: string;
    description: string;
    user_id: number;
    todo_list_id: number;
}

@Table({
    tableName: 'todo_item'
})
export class TodoItem extends Model<TodoItem, TodoItemCreate> {

    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    status: boolean;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => User)
    user_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => TodoList)
    todo_list_id: number;

}