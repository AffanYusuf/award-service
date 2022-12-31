import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DEFAULT_LIMIT_PAGINATION, DEFAULT_PAGE_PAGINATION } from '@constants';
import { AwardService } from './award.service';
import { AwardsRequestDto, AwardsResponseDto, LoginRequestDto, LoginResponseDto } from './dto';
import { BaseResponse } from '@utils';
import { JwtAuthGuard } from '@modules/auth/auth.guard';

@Controller('award-service')
export class AwardController {
    constructor(private readonly awardService: AwardService) {}

    @Post('login')
	async login(
		@Body() body: LoginRequestDto,
	): Promise<BaseResponse<LoginResponseDto>> {
		return this.awardService.login(body);
	}

    @Get('awards')
    @UseGuards(JwtAuthGuard)
	public async getAwards(
		@Query() queryParams: AwardsRequestDto,
	): Promise<BaseResponse<AwardsResponseDto>> {
		const {limit, page, ...params} = queryParams;
		const options = {
			limit: Number(limit) || DEFAULT_LIMIT_PAGINATION,
			page: Number(page) || DEFAULT_PAGE_PAGINATION,
		};
		return this.awardService.getAwards(params, options);
	}
}
