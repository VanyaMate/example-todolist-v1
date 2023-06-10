import { Module } from '@nestjs/common';
import { databaseProviders } from './database-sequelize.providers';
import {ConfigModule} from "@nestjs/config";
import sequelizeConfig from "../../../configs/sequelize.config";

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseSequelizeModule {}