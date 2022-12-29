import {AdminUsersEntity} from '@entities';
import {ADMIN_USER} from '@mock-test-data';
import {JwtService} from '@nestjs/jwt';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';

import {AuthHelper} from './auth.helper';

describe('AuthHelper', () => {
	let helper: AuthHelper;

	const mockJwtService = {
		decode: jest.fn(),
		sign: jest.fn(),
		verify: jest.fn(),
	};
	const mockAdminUserEntity = {
		findOneBy: jest.fn(),
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthHelper,
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
				{
					provide: getRepositoryToken(AdminUsersEntity),
					useValue: mockAdminUserEntity,
				},
			],
		}).compile();

		helper = module.get<AuthHelper>(AuthHelper);
	});

	test('should be defined', () => {
		expect(helper).toBeDefined();
	});

	test('decode', async () => {
		jest.spyOn(mockJwtService, 'decode').mockResolvedValueOnce('string');
		await expect(helper.decodeToken('string')).resolves.toBe('string');
	});

	test('validateAdminUser', async () => {
		mockAdminUserEntity.findOneBy.mockImplementation(() => ADMIN_USER);
		await expect(helper.validateAdminUser('string')).resolves.toStrictEqual(
			ADMIN_USER,
		);
	});

	test('generateToken', () => {
		mockJwtService.sign.mockImplementation(() => 'string');
		expect(helper.generateToken(ADMIN_USER)).toBe('string');
	});
});
