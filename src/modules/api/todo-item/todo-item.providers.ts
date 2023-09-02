import { TagToItem } from '../tags/entities/tag-to-item.entity';
import { TodoItem } from './entities/todo-item.entity';


export default [
    {
        provide : TodoItem.name,
        useValue: TodoItem,
    },
    {
        provide : TagToItem.name,
        useValue: TagToItem,
    },
];