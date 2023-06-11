import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { AccessTokenGuard } from "../../../guards/access-token.guard";
import { IUserVerifiedData, UserVerified } from "../../../decorators/user-verified.decorator";
import { TodoItemService } from "./todo-item.service";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";
import { UpdateTodoItemDto } from "./dto/update-todo-item.dto";
import { SearchOptions } from "../../../decorators/search-options.decorator";
import { ISearchOptions } from "../api.interface";
import { TodoItem } from "./entities/todo-item.entity";

@Controller('/api/todoitem')
export class TodoItemController {

    constructor(private todoItemService: TodoItemService) {}

    @Post('/create')
    @UsePipes(ClassValidatorPipe)
    @UseGuards(AccessTokenGuard)
    create (@Body() createTodoItemDto: CreateTodoItemDto,
            @UserVerified() user: IUserVerifiedData) {
        return this.todoItemService.create(user.id, createTodoItemDto);
    }

    @Get('/my')
    @UseGuards(AccessTokenGuard)
    getMy (@UserVerified() user: IUserVerifiedData,
           @SearchOptions() searchOptions: ISearchOptions<TodoItem>) {
        return this.todoItemService.findMany({ user_id: user.id }, searchOptions);
    }

    @Get('/:id')
    @UseGuards(AccessTokenGuard)
    getById (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string) {
        return this.todoItemService.findOne({ user_id: user.id, id: Number(id) });
    }

    @Get('/byList/:id')
    @UseGuards(AccessTokenGuard)
    getByListId (@UserVerified() user: IUserVerifiedData,
                 @Param('id') id: string,
                 @SearchOptions() searchOptions: ISearchOptions<TodoItem>) {
        return this.todoItemService.findMany({ user_id: user.id, todo_list_id: Number(id) }, searchOptions);
    }

    @Put('/update/:id')
    @UseGuards(AccessTokenGuard)
    update (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string,
            @Body() updateTodoItemDto: UpdateTodoItemDto) {
        return this.todoItemService.update({ user_id: user.id, id: Number(id) }, updateTodoItemDto);
    }

    @Delete('/delete/:id')
    @UseGuards(AccessTokenGuard)
    delete (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string) {
        return this.todoItemService.delete({ user_id: user.id, id: Number(id) });
    }

}