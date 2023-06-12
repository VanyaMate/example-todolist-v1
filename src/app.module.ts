import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import sequelizeConfig from "./configs/sequelize.config";
import { ModulesModule } from "./modules/modules.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${ process.env.NODE_ENV }.env`,
            isGlobal: true,
        }),
        ModulesModule,
    ],
})
export class AppModule {}
