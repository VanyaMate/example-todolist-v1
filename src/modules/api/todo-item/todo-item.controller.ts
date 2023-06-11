import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { AccessTokenGuard } from "../../../guards/access-token.guard";
import { IUserVerifiedData, UserVerified } from "../../../decorators/user-verified.decorator";
import { TodoItemService } from "./todo-item.service";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";
import { UpdateTodoItemDto } from "./dto/update-todo-item.dto";

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
    getMy (@UserVerified() user: IUserVerifiedData) {
        return this.todoItemService.findMany(user.id);
    }

    @Get('/:id')
    @UseGuards(AccessTokenGuard)
    getById (@UserVerified() user: IUserVerifiedData,
             @Param('id') id: string) {
        return this.todoItemService.findOne(user.id, Number(id));
    }

    @Put('/update/:id')
    @UseGuards(AccessTokenGuard)
    update (@UserVerified() user: IUserVerifiedData,
            @Param('id') id: string,
            @Body() updateTodoItemDto: UpdateTodoItemDto) {
        return this.todoItemService.update(user.id, Number(id), updateTodoItemDto);
    }

}