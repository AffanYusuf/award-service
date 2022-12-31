import {UsersEntity} from '@entities';
import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class AuthHelper {
	@InjectRepository(UsersEntity)
	private readonly usersEntity: Repository<UsersEntity>;

	constructor(private jwt: JwtService) {}

	public async decodeToken(token: string): Promise<unknown> {
		try {
			return this.jwt.decode(token, null);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async validateUser(decoded: any): Promise<UsersEntity> {
		try {
			return this.usersEntity.findOneBy({id: decoded.id});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public generateToken(user: UsersEntity): string {
		try {
			const {id, email} = user;
			const payload = {id, email};
			return this.jwt.sign(payload);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
