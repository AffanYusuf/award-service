import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@config/data-source';
import { AwardModule } from '@modules/award/award.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true,
		}),
		AwardModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
