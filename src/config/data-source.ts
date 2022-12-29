import configuration from "@config/configuration";
import { DataSource, DataSourceOptions } from "typeorm";

const configService = configuration();
  
	const {
		database: {
			typeorm: {host, port, username, password, database},
		},
	} = configService;


export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;