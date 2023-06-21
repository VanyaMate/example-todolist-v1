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
import { WhereOptions } from "sequelize";
import { Includeable } from "sequelize/types/model";

@Injectable()
export class UserService {

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

    async findOne(where: WhereOptions<User>, include: Includeable[] = []) {
        try {
            return await this.userRepository.findOne({
                where,
                include: include,
            });
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async update(where: WhereOptions<User>, updateUserDto: UpdateUserDto, include: Includeable[] = []) {
        try {
            const user = await this.userRepository.findOne({ where, include });
            return await user.update(updateUserDto);
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async remove(where: WhereOptions<User>) {
        try {
            return await this.userRepository.destroy({ where });
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
