import { Tag } from './entities/tag.entity';


export default [
    {
        provide : Tag.name,
        useValue: Tag,
    },
];