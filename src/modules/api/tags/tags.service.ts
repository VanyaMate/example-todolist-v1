import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { Includeable } from 'sequelize/types/model';
import { TagAttributes } from '../../../configs/entities.config';
import {
    ERROR_RESPONSE_NO_FIND,
} from '../../../constants/response-errors.constant';
import { IMultiplyResponse, ISearchOptions } from '../api.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';


@Injectable()
export class TagsService {

    constructor (@Inject(Tag.name) private readonly tagRepository: typeof Tag) {
    }

    public create (userId: number, createDto: CreateTagDto): Promise<Tag> {
        try {
            return this.tagRepository.create({
                user_id: userId,
                ...createDto,
            });
        } catch (e) {
            throw new HttpException({ message: 'Bad request' }, 400);
        }
    }

    public async findOne (where: WhereOptions<Tag>, include: Includeable[] = []): Promise<Tag> {
        try {
            const tag: Tag = await this.tagRepository.findOne({
                where,
                include,
                attributes: TagAttributes,
            });
            if (tag) {
                return tag;
            }
            throw { message: ERROR_RESPONSE_NO_FIND };

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
    }

    public async findMany (where: WhereOptions<Tag>, searchOptions: ISearchOptions<Tag> = {}, include: Includeable[] = []): Promise<IMultiplyResponse<Tag>> {
        try {
            const { rows, count } = await this.tagRepository.findAndCountAll({
                where,
                include,
                attributes: TagAttributes,
                ...searchOptions,
            });

            return {
                list   : rows,
                count  : count,
                options: searchOptions,
            };
        } catch (e) {
            throw new HttpException({ message: 'Bad request' }, 400);
        }
    }

    public async patch (where: WhereOptions<Tag>, params: UpdateTagDto, include: Includeable[] = []): Promise<Tag> {
        try {
            const tag: Tag = await this.findOne(where, include);
            if (tag) {
                await tag.update(params);
                return tag;
            }

            throw { message: ERROR_RESPONSE_NO_FIND };
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
    }

    public async delete (where: WhereOptions<Tag>): Promise<number> {
        try {
            return this.tagRepository.destroy({ where });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
    }

}