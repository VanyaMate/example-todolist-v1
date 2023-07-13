import { Module } from '@nestjs/common';
import { databaseProviders } from './database-sequelize.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseSequelizeModule {}