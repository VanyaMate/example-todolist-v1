import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from '../../../user/entities/user.entity';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';
import { TagToItem } from './tag-to-item.entity';


interface TagCreate {
    title: string;
    color: string;
    user_id: number;
}

@Table({
    tableName: 'tags',
})
export class Tag extends Model<Tag, TagCreate> {

    @Column({
        type         : DataType.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
    })
    id: number;

    @Column({
        type     : DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type        : DataType.STRING,
        allowNull   : false,
        defaultValue: '#f08733',
    })
    color: string;

    @Column({
        type     : DataType.INTEGER,
        allowNull: false,
    })
    @ForeignKey(() => User)
    user_id: number;

    @BelongsToMany(() => TodoItem, () => TagToItem, 'todo_item_id')
    todo_items: TodoItem[];

}