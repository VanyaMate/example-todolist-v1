import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ClassValidatorPipe } from "../../../pipes/class-validator.pipe";
import { AccessTokenGuard } from "../../../guards/access-token.guard";
import { IUserVerifiedData, UserVerified } from "../../../decorators/user-verified.decorator";
import { TodoItemService } from "./todo-item.service";
import { CreateTodoItemDto } from "./dto/create-todo-item.dto";

@Controller('/api/todoitem')
export class TodoItemController {

    constructor(private todoListService: TodoItemService) {}

    @Post('/create')
    @UsePipes(ClassValidatorPipe)
    @UseGuards(AccessTokenGuard)
    create (@Body() createTodoItemDto: CreateTodoItemDto,
            @UserVerified() user: IUserVerifiedData) {
        return this.todoListService.create(user.id, createTodoItemDto);
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

    @Get('/activate/:id')
    @UseGuards(AccessTokenGuard)
    activate (@UserVerified() user: IUserVerifiedData,
              @Param('id') id: string) {
        return this.todoListService.updateStatus(user.id, Number(id), true);
    }

    @Get('/deactivate/:id')
    @UseGuards(AccessTokenGuard)
    deactivate (@UserVerified() user: IUserVerifiedData,
                @Param('id') id: string) {
        return this.todoListService.updateStatus(user.id, Number(id), false);
    }

}