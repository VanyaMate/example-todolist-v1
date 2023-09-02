import {
    Body,
    Controller,
    Delete,
    Get, Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { TagInclude } from '../../../configs/entities.config';
import { SearchOptions } from '../../../decorators/search-options.decorator';
import {
    IUserVerifiedData,
    UserVerified,
} from '../../../decorators/user-verified.decorator';
import { AccessTokenGuard } from '../../../guards/access-token.guard';
import { ISearchOptions } from '../api.interface';
import { TodoItem } from '../todo-item/entities/todo-item.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';


@Controller('/api/v1/tags')
export class TagsController {

    constructor (private readonly tagsService: TagsService) {
    }

    @Get()
    @UseGuards(AccessTokenGuard)
    public get (@Body() searchBy: UpdateTagDto,
                @SearchOptions() searchOptions: ISearchOptions<Tag>,
                @UserVerified() user: IUserVerifiedData) {
        return this.tagsService.findMany({ user_id: user.id, ...searchBy }, searchOptions);
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    public getOne (@Param('id') id: string,
                   @UserVerified() user: IUserVerifiedData) {
        return this.tagsService.findOne({ user_id: user.id, id: parseInt(id) });
    }

    @Post()
    @UseGuards(AccessTokenGuard)
    public create (@Body() createDto: CreateTagDto,
                   @UserVerified() user: IUserVerifiedData) {
        return this.tagsService.create(user.id, createDto);
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    public patch (@Body() updateDto: UpdateTagDto,
                  @UserVerified() user: IUserVerifiedData,
                  @Param('id') id: string) {
        return this.tagsService.patch({
            id     : parseInt(id),
            user_id: user.id,
        }, updateDto);
    }


    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    public delete (@UserVerified() user: IUserVerifiedData,
                   @Param('id') id: string) {
        return this.tagsService.delete({
            id     : parseInt(id),
            user_id: user.id,
        });
    }

}