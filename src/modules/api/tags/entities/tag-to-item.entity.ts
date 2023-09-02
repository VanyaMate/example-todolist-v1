import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';
import { Tag } from './tag.entity';


interface TagToItemCreate {
    todo_item_id: number;
    tag_id: number;
}

@Table({
    tableName: 'TagToItem',
})
export class TagToItem extends Model<TagToItem, TagToItemCreate> {
    @Column({
        type         : DataType.INTEGER,
        allowNull    : false,
        autoIncrement: true,
        primaryKey   : true,
    })
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => TodoItem)
    todo_item_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => Tag)
    tag_id: number;
}