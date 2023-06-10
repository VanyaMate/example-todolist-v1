import {Sequelize} from "sequelize-typescript";
import {User} from "../../user/entities/user.entity";
import {ConfigService} from "@nestjs/config";
import {Dialect} from "sequelize/types/sequelize";
import { Token } from "../../token/entities/token.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (config: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: config.get<Dialect>('DB_SEQUELIZE_DIALECT'),
                host: config.get<string>('DB_SEQUELIZE_HOST'),
                port: Number(config.get<number>('DB_SEQUELIZE_PORT') ?? 3000),
                username: config.get<string>('DB_SEQUELIZE_USERNAME'),
                password: config.get<string>('DB_SEQUELIZE_PASS'),
                database: config.get<string>('DB_SEQUELIZE_DATABASE'),
                logging: false,
            });
            sequelize.addModels([User, Token]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService]
    },
];