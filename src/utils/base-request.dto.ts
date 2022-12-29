import {IsOptional, IsString} from 'class-validator';

export class BaseRequest {
	@IsString()
	@IsOptional()
	page?: string;

	@IsString()
	@IsOptional()
	limit?: string;
}
