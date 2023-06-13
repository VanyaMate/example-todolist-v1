import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { AccessTokenGuard } from "../../../guards/access-token.guard";
import { IUserVerifiedData, UserVerified } from "../../../decorators/user-verified.decorator";
import { TodoListService } from "./todo-list.service";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";
import { SearchOptions } from "../../../decorators/search-options.decorator";
import { ISearchOptions } from "../api.interface";
import { TodoList } from "./entities/todo-list.entity";
import { ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseUnauthorizedSwagger, SWAGGER_JWT_EXAMPLE, TodoListSwagger } from "../../../configs/swagger.config";
import { COOKIE_ACCESS_TOKEN } from "../../../constants/cookies.constant";

@ApiTags('Списки задач')
@Controller('/api/todolist')
export class TodoListController {

    constructor(private todoListService: TodoListService) {}

    @ApiOperation({ summary: 'Создать список задач' })
    @ApiResponse({ status: 200, type: TodoListSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({ name: COOKIE_ACCESS_TOKEN, description: 'Cookie.httpOnly jwt token', example: SWAGGER_JWT_EXAMPLE })
    @Post('/create')
    @UsePipes(ClassValidatorPipe)
    @UseGuards(AccessTokenGuard)
    create (@Body() createTodoListDto: CreateTodoListDto,
            @UserVerified() user: IUserVerifiedData) {
        return this.todoListService.create(user.id, createTodoListDto);
    }

    @ApiOperation({ summary: 'Получить списки задач авторизованного пользователя' })
    @ApiResponse({ status: 200, type: [TodoListSwagger] })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({ name: COOKIE_ACCESS_TOKEN, description: 'Cookie.httpOnly jwt token', example: SWAGGER_JWT_EXAMPLE })
    @Get('/my')
    @UseGuards(AccessTokenGuard)
    getMy (@UserVerified() user: IUserVerifiedData,
           @SearchOptions() searchOptions: ISearchOptions<TodoList>) {
        return this.todoListService.findMany({ user_id: user.id }, searchOptions);
    }

    @ApiOperation({ summary: 'Получить список задач авторизованного пользователя по id' })
    @ApiResponse({ status: 200, type: TodoListSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({ name: COOKIE_ACCESS_TOKEN, description: 'Cookie.httpOnly jwt token', example: SWAGGER_JWT_EXAMPLE })
    @Get('/:id')
    @UseGuards(AccessTokenGuard)
    getById (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string) {
        return this.todoListService.findOne({ user_id: user.id, id: Number(id) });
    }

    @ApiOperation({ summary: 'Изменить список задач по id' })
    @ApiResponse({ status: 200, type: TodoListSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({ name: COOKIE_ACCESS_TOKEN, description: 'Cookie.httpOnly jwt token', example: SWAGGER_JWT_EXAMPLE })
    @Put('/update/:id')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ClassValidatorPipe)
    update (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string,
            @Body() updateTodoListDto: UpdateTodoListDto) {
        return this.todoListService.update({ user_id: user.id, id: Number(id) }, updateTodoListDto);
    }

    @ApiOperation({ summary: 'Удалить список задач по id' })
    @ApiResponse({ status: 200, type: TodoListSwagger })
    @ApiResponse({ status: 401, type: ResponseUnauthorizedSwagger })
    @ApiHeader({ name: COOKIE_ACCESS_TOKEN, description: 'Cookie.httpOnly jwt token', example: SWAGGER_JWT_EXAMPLE })
    @Delete('/delete/:id')
    @UseGuards(AccessTokenGuard)
    delete (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string) {
        return this.todoListService.delete({ user_id: user.id, id: Number(id) });
    }

}