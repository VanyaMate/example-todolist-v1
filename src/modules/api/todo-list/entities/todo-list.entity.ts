import {
    Model,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Table,
} from 'sequelize-typescript';
import { User } from '../../../user/entities/user.entity';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';
import {
    CreateOptions,
    InstanceDestroyOptions,
    InstanceRestoreOptions,
} from 'sequelize';


interface TodoListCreate {
    title: string;
    description: string;
    user_id: number;
}

@Table({
    tableName: 'todo_list',
})
export class TodoList extends Model<TodoList, TodoListCreate> {

    @Column({
        type         : DataType.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '#68f8f8' })
    colorHex: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => User)
    user_id: number;

    @HasMany(() => TodoItem)
    todo_items: TodoItem[];

}