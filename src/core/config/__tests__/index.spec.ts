import * as configExports from '../index';
import { getCorsConfig } from '../cors.config';
import { setupSwagger } from '../swagger.config';

describe('config barrel exports', () => {
	it('re-exports getCorsConfig', () => {
		expect(configExports.getCorsConfig).toBe(getCorsConfig);
	});

	it('re-exports setupSwagger', () => {
		expect(configExports.setupSwagger).toBe(setupSwagger);
	});
});
