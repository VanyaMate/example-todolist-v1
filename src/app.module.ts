import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ModulesModule } from "./modules/modules.module";

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
