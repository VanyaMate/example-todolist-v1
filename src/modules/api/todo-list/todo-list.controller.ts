import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { AccessTokenGuard } from "../../../guards/access-token.guard";
import { IUserVerifiedData, UserVerified } from "../../../decorators/user-verified.decorator";
import { TodoListService } from "./todo-list.service";
import { UpdateTodoItemDto } from "../todo-item/dto/update-todo-item.dto";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";
import { SearchOptions } from "../../../decorators/search-options.decorator";
import { ISearchOptions } from "../api.interface";
import { TodoItem } from "../todo-item/entities/todo-item.entity";
import { TodoList } from "./entities/todo-list.entity";

@Controller('/api/todolist')
export class TodoListController {

    constructor(private todoListService: TodoListService) {}

    @Post('/create')
    @UsePipes(ClassValidatorPipe)
    @UseGuards(AccessTokenGuard)
    create (@Body() createTodoListDto: CreateTodoListDto,
            @UserVerified() user: IUserVerifiedData) {
        return this.todoListService.create(user.id, createTodoListDto);
    }

    @Get('/my')
    @UseGuards(AccessTokenGuard)
    getMy (@UserVerified() user: IUserVerifiedData,
           @SearchOptions() searchOptions: ISearchOptions<TodoList>) {
        return this.todoListService.findMany({ user_id: user.id }, searchOptions);
    }

    @Get('/:id')
    @UseGuards(AccessTokenGuard)
    getById (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string) {
        return this.todoListService.findOne({ user_id: user.id, id: Number(id) });
    }


    @Put('/update/:id')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ClassValidatorPipe)
    update (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string,
            @Body() updateTodoListDto: UpdateTodoListDto) {
        return this.todoListService.update({ user_id: user.id, id: Number(id) }, updateTodoListDto);
    }

    @Delete('/delete/:id')
    @UseGuards(AccessTokenGuard)
    delete (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string) {
        return this.todoListService.delete({ user_id: user.id, id: Number(id) });
    }

}