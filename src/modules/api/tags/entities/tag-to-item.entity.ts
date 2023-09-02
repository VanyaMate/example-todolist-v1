import {
    BelongsTo,
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

    @BelongsTo(() => TodoItem, 'todo_item_id')
    todo_item: TodoItem;

    @BelongsTo(() => Tag, 'tag_id')
    tag: Tag;
}