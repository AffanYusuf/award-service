import * as dotenv from 'dotenv';

const { parsed } = dotenv.config({
  path: `${process.cwd()}/.env`,
});
process.env = { ...parsed, ...process.env };
export default () => ({
	appPort: process.env.APP_PORT || 5000,
	database: {
		typeorm: {
			port: Number(process.env.TYPEORM_PORT),
			host: process.env.TYPEORM_HOST,
			database: process.env.TYPEORM_DATABASE,
			username: process.env.TYPEORM_USERNAME,
			password: process.env.TYPEORM_PASSWORD,
		},
	},
	jwtKey: process.env.JWT_KEY,
	jwtExpires: process.env.JWT_EXPIRES,
});
