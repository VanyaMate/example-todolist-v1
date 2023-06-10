import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {REPOSITORY_USER} from "../../configs/repositories-names.config";
import {User} from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

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

    async findOne(id: number) {
        try {
            return await this.userRepository.findOne({ where: { id } });
        }
        catch (e) {
            throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
        }
    }

    async findByLogin(login: string) {
        try {
            return await this.userRepository.findOne({ where: { login }, include: ['token']});
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

}
