import 'reflect-metadata';

import { MODULE_METADATA } from '@nestjs/common/constants';

import { AuthController } from '../auth.controller';
import { AuthModule } from '../auth.module';

describe('AuthModule', () => {
	it('is defined', () => {
		expect(AuthModule).toBeDefined();
	});

	it('registers the auth controller', () => {
		expect(Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, AuthModule)).toEqual([
			AuthController,
		]);
	});
});
