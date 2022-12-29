import {
	AwardsEntity,
	UsersEntity,
} from '@entities';
import {AuthHelper} from '@modules/auth/auth.helper';
import {JwtStrategy} from '@modules/auth/auth.strategy';
import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AwardController } from './award.controller';
import { AwardService } from './award.service';


@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('jwtKey'),
				signOptions: {expiresIn: configService.get('jwtExpires')},
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([
			UsersEntity,
			AwardsEntity
		]),
	],
	controllers: [AwardController],
	providers: [AwardService, AuthHelper, JwtStrategy],
	exports: [AwardService],
})
export class AwardModule {}
