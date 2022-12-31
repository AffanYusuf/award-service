import {
	UsersEntity,
	AwardsEntity,
} from '@entities';
import {USER} from '@mock-test-data';
import {AuthHelper} from '@modules/auth/auth.helper';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DefaultResponse, BaseResponse} from '@utils';

import {LoginRequestDto, LoginResponseDto} from './dto';
import {AwardService} from './award.service';

describe('WebController', () => {
	let service: AwardService;

	const mockAuth = {
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
	});

	afterEach(async () => {
		jest.clearAllMocks();
	});

	test('should be defined', () => {
		expect(service).toBeDefined();
	});

	test('login', async () => {
		const loginResult: BaseResponse<LoginResponseDto> = new DefaultResponse({
			bearerToken: 'string',
		});
		const loginBody: LoginRequestDto = {email: 'string'};

		mockAuth.findOne.mockImplementationOnce(() => USER);
		mockHelper.isPasswordValid.mockImplementation(() => true);
		mockAuth.update.mockImplementation(() => true);
		mockHelper.generateToken.mockImplementation(() => 'string');

		await expect(service.login(loginBody)).resolves.toStrictEqual(loginResult);
	});
});
