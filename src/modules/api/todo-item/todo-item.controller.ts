import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { TagInclude } from '../../../configs/entities.config';
import { ClassValidatorPipe } from '../../../pipes/class-validator.pipe';
import { AccessTokenGuard } from '../../../guards/access-token.guard';
import {
    IUserVerifiedData,
    UserVerified,
} from '../../../decorators/user-verified.decorator';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { SearchOptions } from '../../../decorators/search-options.decorator';
import { ISearchOptions } from '../api.interface';
import { TodoItem } from './entities/todo-item.entity';
import {
    ApiHeader,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {
    ResponseUnauthorizedSwagger,
    SWAGGER_JWT_EXAMPLE,
    TodoItemSwagger,
} from '../../../configs/swagger.config';
import { COOKIE_ACCESS_TOKEN } from '../../../constants/cookies.constant';
import { Op, WhereOptions } from 'sequelize';


@ApiTags('Задачи')
@Controller('/api/todoitem')
export class TodoItemController {

    constructor (private todoItemService: TodoItemService) {
    }

    @ApiOperation({ summary: 'Создать задачу' })
    @ApiResponse({ status: 200, type: TodoItemSwagger })
    @ApiHeader({
        name       : COOKIE_ACCESS_TOKEN,
        description: 'Cookie.httpOnly jwt token',
        example    : SWAGGER_JWT_EXAMPLE,
    })
    @Post('/create')
    @UsePipes(ClassValidatorPipe)
    @UseGuards(AccessTokenGuard)
    create (@Body() createTodoItemDto: CreateTodoItemDto,
            @UserVerified() user: IUserVerifiedData) {
        return this.todoItemService.create(user.id, createTodoItemDto);
    }

    @ApiOperation({ summary: 'Получить список задач авторизованного пользователя' })
    @ApiResponse({ status: 200, type: [ TodoItemSwagger ] })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiQuery({ name: '' })
    @ApiHeader({
        name       : COOKIE_ACCESS_TOKEN,
        description: 'Cookie.httpOnly jwt token',
        example    : SWAGGER_JWT_EXAMPLE,
    })
    @Get('/my')
    @UseGuards(AccessTokenGuard)
    getMy (@UserVerified() user: IUserVerifiedData,
           @SearchOptions() searchOptions: ISearchOptions<TodoItem>,
           @Query('date') date: string) {
        const filters: WhereOptions<TodoItem> = { user_id: user.id };
        if (date === 'not-null') {
            filters.completion_date = { [Op.not]: null };
        }
        return this.todoItemService.findMany(filters, searchOptions);
    }

    /**
     * TODO: Добавить swagger
     */
    @Get('/overdue')
    @UseGuards(AccessTokenGuard)
    getMyOverdue (@UserVerified() user: IUserVerifiedData,
                  @SearchOptions() searchOptions: ISearchOptions<TodoItem>) {
        return this.todoItemService.getOverdue(user.id, searchOptions);
    }

    @Get('/today')
    @UseGuards(AccessTokenGuard)
    getMyToday (@UserVerified() user: IUserVerifiedData,
                @SearchOptions() searchOptions: ISearchOptions<TodoItem>) {
        return this.todoItemService.getToday(user.id, searchOptions);
    }

    @Get('/completed')
    @UseGuards(AccessTokenGuard)
    getMyCompleted (@UserVerified() user: IUserVerifiedData,
                    @SearchOptions() searchOptions: ISearchOptions<TodoItem>) {
        return this.todoItemService.getCompleted(user.id, searchOptions);
    }


    @Get('/upcoming')
    @UseGuards(AccessTokenGuard)
    getMyUpcoming (@UserVerified() user: IUserVerifiedData,
                   @SearchOptions() searchOptions: ISearchOptions<TodoItem>) {
        return this.todoItemService.getUpcoming(user.id, searchOptions);
    }

    @ApiOperation({ summary: 'Получить задачу авторизованного пользователя по id' })
    @ApiResponse({ status: 200, type: TodoItemSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({
        name       : COOKIE_ACCESS_TOKEN,
        description: 'Cookie.httpOnly jwt token',
        example    : SWAGGER_JWT_EXAMPLE,
    })
    @Get('/:id')
    @UseGuards(AccessTokenGuard)
    getById (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string) {
        return this.todoItemService.findOne({
            user_id: user.id,
            id     : Number(id),
        });
    }

    @ApiOperation({ summary: 'Получить список задач авторизованного пользователя по id списка задач' })
    @ApiResponse({ status: 200, type: [ TodoItemSwagger ] })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({
        name       : COOKIE_ACCESS_TOKEN,
        description: 'Cookie.httpOnly jwt token',
        example    : SWAGGER_JWT_EXAMPLE,
    })
    @Get('/byList/:id')
    @UseGuards(AccessTokenGuard)
    getByListId (@UserVerified() user: IUserVerifiedData,
                 @Param('id') id: string,
                 @SearchOptions() searchOptions: ISearchOptions<TodoItem>,
                 @Query('date') date: string) {
        const filters: WhereOptions<TodoItem> = {
            user_id     : user.id,
            todo_list_id: id,
        };
        if (date === 'not-null') {
            filters.completion_date = { [Op.not]: null };
        }
        return this.todoItemService.findMany(filters, searchOptions);
    }

    @ApiOperation({ summary: 'Обновить данные в задаче по id' })
    @ApiResponse({ status: 200, type: TodoItemSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({
        name       : COOKIE_ACCESS_TOKEN,
        description: 'Cookie.httpOnly jwt token',
        example    : SWAGGER_JWT_EXAMPLE,
    })
    @Patch('/update/:id')
    @UseGuards(AccessTokenGuard)
    update (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string,
            @Body() updateTodoItemDto: UpdateTodoItemDto) {
        return this.todoItemService.update({
            user_id: user.id,
            id     : Number(id),
        }, updateTodoItemDto);
    }

    @ApiOperation({ summary: 'Удалить задачу по id' })
    @ApiResponse({ status: 200, type: TodoItemSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({
        name       : COOKIE_ACCESS_TOKEN,
        description: 'Cookie.httpOnly jwt token',
        example    : SWAGGER_JWT_EXAMPLE,
    })
    @Delete('/delete/:id')
    @UseGuards(AccessTokenGuard)
    delete (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string) {
        return this.todoItemService.delete({
            user_id: user.id,
            id     : Number(id),
        });
    }

    @Post('/tags/:id')
    @UseGuards(AccessTokenGuard)
    addTags (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string,
             @Body() { tagIds }: { tagIds: string }) {
        return this.todoItemService.addTags({
            user_id: user.id,
            id     : Number(id),
        }, (tagIds ? JSON.parse(tagIds) : []).map((tag) => Number(tag)));
    }

    @Delete('/tags/:id')
    @UseGuards(AccessTokenGuard)
    deleteTags (@UserVerified() user: IUserVerifiedData,
                @Param('id') id: string,
                @Body() { tagIds }: { tagIds: string }) {
        return this.todoItemService.removeTags({
            user_id: user.id,
            id     : Number(id),
        }, (tagIds ? JSON.parse(tagIds) : []).map((tag) => Number(tag)));
    }

}