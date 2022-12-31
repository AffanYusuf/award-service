import {
	UsersEntity,
	AwardsEntity,
} from '@entities';
import {GET_AWARDS_RESPONSE} from '@mock-test-data';
import {AuthHelper} from '@modules/auth/auth.helper';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DefaultResponse, BaseResponse} from '@utils';

import {AwardsResponseDto, LoginRequestDto, LoginResponseDto} from './dto';
import {AwardController} from './award.controller';
import {AwardService} from './award.service';

describe('AwardController', () => {
	let controller: AwardController;
	let service: AwardService;

	const mockAuth = {
		login: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
	};

	const mockHelper = {
		isPasswordValid: jest.fn(),
		generateToken: jest.fn(),
	};
	const mockAward = jest.fn();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AwardController],
			providers: [
				AwardService,
				{
					provide: getRepositoryToken(UsersEntity),
					useValue: mockAuth,
				},
				{
					provide: getRepositoryToken(AwardsEntity),
					useValue: mockAward,
				},
				{
					provide: AuthHelper,
					useValue: mockHelper,
				},
			],
		}).compile();

		service = module.get<AwardService>(AwardService);
		controller = module.get<AwardController>(AwardController);
	});

	test('should be defined', () => {
		expect(controller).toBeDefined();
	});

	test('login', async () => {
		const loginResult: BaseResponse<LoginResponseDto> = new DefaultResponse({
			bearerToken: 'string',
		});
		const loginBody: LoginRequestDto = {email: 'string'};

		jest.spyOn(service, 'login').mockResolvedValueOnce(loginResult);

		await expect(controller.login(loginBody)).resolves.toStrictEqual(
			loginResult,
		);
	});

	test('get order awards', async () => {
		const response: BaseResponse<AwardsResponseDto> =
			new DefaultResponse(GET_AWARDS_RESPONSE.data);

		jest
			.spyOn(service, 'getAwards')
			.mockResolvedValueOnce(response);

		await expect(
			controller.getAwards({pointFrom: 10000, pointTo:500000}),
		).resolves.toStrictEqual(response);
	});
});
