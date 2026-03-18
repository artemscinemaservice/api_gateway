import { MODULE_METADATA } from '@nestjs/common/constants';
import { ConfigModule } from '@nestjs/config';
import 'reflect-metadata';

import { AuthModule } from '../../modules/auth/auth.module';
import { AppController } from '../app.controller';
import { AppModule } from '../app.module';

describe('AppModule', () => {
	it('registers the expected controller', () => {
		expect(
			Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, AppModule)
		).toEqual([AppController]);
	});

	it('configures ConfigModule as a global import', async () => {
		const imports = Reflect.getMetadata(
			MODULE_METADATA.IMPORTS,
			AppModule
		) as Array<{
			then?: (onfulfilled?: (value: unknown) => unknown) => unknown;
		}>;

		expect(imports).toHaveLength(2);
		await expect(imports[0]).resolves.toEqual(
			expect.objectContaining({
				module: ConfigModule,
				global: true,
			})
		);
		expect(imports[1]).toBe(AuthModule);
	});
});
