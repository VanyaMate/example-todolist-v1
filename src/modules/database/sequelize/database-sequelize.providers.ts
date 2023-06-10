import {Sequelize} from "sequelize-typescript";
import {User} from "../../user/entities/user.entity";
import {ConfigService} from "@nestjs/config";
import {Dialect} from "sequelize/types/sequelize";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (config: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: config.get<Dialect>('sequelize.dialect'),
                host: config.get<string>('sequelize.host'),
                port: config.get<number>('sequelize.port'),
                username: config.get<string>('sequelize.username'),
                password: config.get<string>('sequelize.password'),
                database: config.get<string>('sequelize.database'),
                logging: false,
            });
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService]
    },
];