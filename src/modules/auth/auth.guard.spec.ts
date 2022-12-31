import {USER} from '@mock-test-data';
import {Test, TestingModule} from '@nestjs/testing';

import {JwtAuthGuard} from './auth.guard';
import {AuthHelper} from './auth.helper';

describe('JwtAuthGuard', () => {
	let guard: JwtAuthGuard;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JwtAuthGuard,
				{
					provide: AuthHelper,
					useValue: jest.fn().mockImplementation(() => true),
				},
			],
		}).compile();

		guard = module.get<JwtAuthGuard>(JwtAuthGuard);
	});

	test('should be defined', () => {
		expect(guard).toBeDefined();
	});

	test('handleRequest', () => {
		expect(guard.handleRequest(undefined, USER)).toStrictEqual(
			USER,
		);
	});
});
