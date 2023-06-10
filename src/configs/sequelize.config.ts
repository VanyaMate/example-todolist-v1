import {SequelizeOptions} from "sequelize-typescript";
import {Dialect} from "sequelize/types/sequelize";

interface SequelizeConfig {
    sequelize: {
        env: string;
        dev: SequelizeOptions;
        prod: SequelizeOptions;
    }
}

export default (): SequelizeConfig => ({
    sequelize: {
        env: `sequelize.${ process.env.NODE_ENV }`,
        dev: {
            dialect: process.env.DB_SEQUELZIE_DIALECT as Dialect,
            host: process.env.DB_SEQUELZIE_HOST,
            port: parseInt(process.env.DB_SEQUELZIE_PORT, 10),
            username: process.env.DB_SEQUELZIE_USERNAME,
            password: process.env.DB_SEQUELZIE_PASS,
            database: process.env.DB_SEQUELZIE_DATABASE,
        },
        prod: {

        }
    }
})