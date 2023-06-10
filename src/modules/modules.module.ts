import { Module } from "@nestjs/common";
import { DatabaseSequelizeModule } from "./database/sequelize/database-sequelize.module";
import { UserModule } from "./user/user.module";
import { ApiModule } from "./api/api.module";

@Module({
    imports: [
        ApiModule,
        UserModule,
        DatabaseSequelizeModule,
    ]
})
export class ModulesModule {}