import {BaseRequest} from '@utils';
import {IsNumber, IsOptional, IsString} from 'class-validator';

export class AwardsRequestDto extends BaseRequest {
	@IsNumber()
	@IsOptional()
	pointFrom?: number;

	@IsNumber()
	@IsOptional()
	pointTo?: number;

	@IsString()
	@IsOptional()
	type?: string;
}
