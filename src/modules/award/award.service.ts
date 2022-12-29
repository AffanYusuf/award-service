import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwardsEntity, UsersEntity } from '@entities';
import { BaseResponse, DefaultResponse } from '@utils';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Between, Repository } from 'typeorm';
import { AwardsRequestDto, AwardsResponseDto, LoginRequestDto, LoginResponseDto } from './dto';
import { AuthHelper } from '@modules/auth/auth.helper';

@Injectable()
export class AwardService {
    constructor(
        @Inject(AuthHelper)
		private readonly helper: AuthHelper,
        
        @InjectRepository(UsersEntity)
		private readonly usersRepository: Repository<UsersEntity>,
		
        @InjectRepository(AwardsEntity)
		private readonly awardsRepository: Repository<AwardsEntity>,
		
	) {}

    public async login(
		body: LoginRequestDto,
	): Promise<BaseResponse<LoginResponseDto>> {
		try {
			const {email}: LoginRequestDto = body;
			const user: UsersEntity = await this.usersRepository.findOne({
				where: {email},
			});

			if (!user) {
				throw new DefaultResponse(
					null,
					'Invalid input email. No user found',
					HttpStatus.NOT_FOUND,
				);
			}


			const bearerToken = this.helper.generateToken(user);

			return new DefaultResponse({bearerToken});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

    private prepareWhereQueryAwards(
		queryParams: AwardsRequestDto,
	) {
		const where = {};
		const {pointFrom, pointTo, type} = queryParams;

		if (pointFrom && pointTo) {
			where['point'] = Between(Number(pointFrom), Number(pointTo));
		}
		if (type && type != 'ALL') {
			where['type'] = type;
		}
		return where;
	}

    public async getAwards(
		queryParams: AwardsRequestDto,
		options: IPaginationOptions,
	): Promise<BaseResponse<AwardsResponseDto>> {
		try {

            const where = this.prepareWhereQueryAwards(queryParams);

            const {items, meta} = await paginate<AwardsEntity>(
                this.awardsRepository,
                options,
                {
                    where,
                },
            );
            const {currentPage, itemsPerPage, totalItems, totalPages} = meta;
			const metadata = {
				totalItems,
				itemsPerPage,
				currentPage,
				totalPages,
			};
			return new DefaultResponse(items, null, null, metadata);
		} catch (error) {
			throw new Error(error);
		}
	}

}
