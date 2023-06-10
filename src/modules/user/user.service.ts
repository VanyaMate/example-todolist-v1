import {BadRequestException, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {REPOSITORY_USER} from "../../configs/repositories-names.config";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {

    constructor(@Inject(REPOSITORY_USER) private userRepository: typeof User) {}

    async create(createUserDto: CreateUserDto) {
        try {
            return await this.userRepository.create({...createUserDto})
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

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findOne({ where: { id }});
            user.password = updateUserDto.password;
            return await user.save()
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
