import { Module } from '@nestjs/common';
import {DatabaseSequelizeModule} from "./modules/database/sequelize/database-sequelize.module";
import {ConfigModule} from "@nestjs/config";
import sequelizeConfig from "./configs/sequelize.config";
import {UserModule} from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [sequelizeConfig],
            isGlobal: true,
        }),
        UserModule,
        DatabaseSequelizeModule
    ],
})
export class AppModule {}
