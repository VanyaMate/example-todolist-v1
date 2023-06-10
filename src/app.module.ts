import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import sequelizeConfig from "./configs/sequelize.config";
import { ModulesModule } from "./modules/modules.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${ process.env.NODE_ENV }.env`,
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: '30d'
            }
        }),
        ModulesModule,
    ],
})
export class AppModule {}
