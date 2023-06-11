import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { CreateTodoListDto } from "./dto/create-todo-list.dto";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { AccessTokenGuard } from "../../../guards/access-token.guard";
import { IUserVerifiedData, UserVerified } from "../../../decorators/user-verified.decorator";
import { TodoListService } from "./todo-list.service";
import { UpdateTodoItemDto } from "../todo-item/dto/update-todo-item.dto";
import { UpdateTodoListDto } from "./dto/update-todo-list.dto";

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
    getMy (@UserVerified() user: IUserVerifiedData) {
        return this.todoListService.findMany(user.id);
    }

    @Get('/:id')
    @UseGuards(AccessTokenGuard)
    getById (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string) {
        return this.todoListService.findOne(user.id, Number(id));
    }


    @Put('/update/:id')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ClassValidatorPipe)
    update (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string,
            @Body() updateTodoListDto: UpdateTodoListDto) {
        return this.todoListService.update(user.id, Number(id), updateTodoListDto);
    }

}