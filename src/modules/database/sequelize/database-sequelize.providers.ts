import {Sequelize} from "sequelize-typescript";
import {User} from "../../user/entities/user.entity";
import {ConfigService} from "@nestjs/config";
import {Dialect} from "sequelize/types/sequelize";
import { Token } from "../../token/entities/token.entity";
import { TodoItem } from "../../api/todo-item/entities/todo-item.entity";
import { TodoList } from "../../api/todo-list/entities/todo-list.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (config: ConfigService) => {
            // TODO: Fix this fix for render.com
            const sequelize = process.env.NODE_ENV === 'prod'
                ?   new Sequelize('postgres://vanyamate:d4DGaej1OOkA4jH4dv4ZJ3N6yMZWmtmG@dpg-cio46ctgkuvudi8mar5g-a.frankfurt-postgres.render.com/todolist_ytqw', {
                    ssl: false
                })
                :   new Sequelize({
                        dialect: config.get<Dialect>('DB_SEQUELIZE_DIALECT'),
                        host: config.get<string>('DB_SEQUELIZE_HOST'),
                        port: Number(config.get<number>('DB_SEQUELIZE_PORT') ?? 3000),
                        username: config.get<string>('DB_SEQUELIZE_USERNAME'),
                        password: config.get<string>('DB_SEQUELIZE_PASS'),
                        database: config.get<string>('DB_SEQUELIZE_DATABASE'),
                        logging: false,
                    });
            sequelize.addModels([User, Token, TodoItem, TodoList]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService]
    },
];