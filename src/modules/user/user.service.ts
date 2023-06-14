import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { Token } from "../token/entities/token.entity";
import { TodoList } from "../api/todo-list/entities/todo-list.entity";
import { TodoItem } from "../api/todo-item/entities/todo-item.entity";
import { UserPrivate } from "./user.interface";
import { TodoListInclude, TokenInclude } from "../../configs/entities.config";

@Injectable()
export class UserService {

    /**
     * TODO: Изменить на filter
     */

    constructor(@Inject(User.name) private userRepository: typeof User) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const hashPassword = await bcrypt.hash(createUserDto.password, 3);
            return await this.userRepository.create({...createUserDto, password: hashPassword});
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(id: number) {
        try {
            return await this.userRepository.findOne({
                where: { id },
                include: [
                    TokenInclude,
                    TodoListInclude,
                ]
            });
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async findByLogin(login: string) {
        try {
            return await this.userRepository.findOne({
                where: { login },
                include: [
                    TokenInclude,
                    TodoListInclude,
                ]
            });
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findOne({ where: { id }});
            return await user.update(updateUserDto);
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async remove(id: number) {
        try {
            return await this.userRepository.destroy({ where: { id }});
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    toPrivate (user: User): UserPrivate {
        const data: User = user.dataValues;

        delete data.password;
        delete data.token;

        return data;
    }

}
