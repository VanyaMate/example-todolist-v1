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
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>("JWT_SECRET_KEY"),
                signOptions: {
                    expiresIn: '30d'
                }
            }),
            inject: [ConfigService]
        }),
        ModulesModule,
    ],
})
export class AppModule {}
