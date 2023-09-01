import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../../token/token.module';
import { TagsController } from './tags.controller';
import tagsProviders from './tags.providers';
import { TagsService } from './tags.service';


@Module({
    controllers: [
        TagsController,
    ],
    providers  : [
        TagsService,
        ...tagsProviders,
    ],
    imports    : [
        JwtModule,
        TokenModule,
    ],
})
export class TagsModule {
}