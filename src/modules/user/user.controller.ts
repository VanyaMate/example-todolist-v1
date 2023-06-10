import {Controller, Get, Query} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('/api/user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('/create')
    create (@Query('login') login: string,
            @Query('pass') pass: string) {
        return this.userService.create({
            login: login,
            password: pass,
        })
    }

}