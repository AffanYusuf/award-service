import {UsersEntity} from '@entities';
import {
	Injectable,
	ExecutionContext,
	Inject,
	UnauthorizedException,
} from '@nestjs/common';
import {AuthGuard, IAuthGuard} from '@nestjs/passport';
import {Request} from 'express';

import {AuthHelper} from './auth.helper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
	@Inject(AuthHelper)
	private readonly helper: AuthHelper;
	public handleRequest(err: unknown, user: UsersEntity): any {
		return user;
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context);

		const {
			headers: {authorization},
		}: Request = context.switchToHttp().getRequest();
		if (!authorization) throw new UnauthorizedException();
		const token = authorization.replace('Bearer', '').trim();
		const decode = await this.helper.decodeToken(token);
		const validate = await this.helper.validateUser(decode);
		return validate ? true : false;
	}
}
