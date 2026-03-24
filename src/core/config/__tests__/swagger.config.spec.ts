import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { setupSwagger } from '../swagger.config';

describe('setupSwagger', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('builds the swagger document and mounts the docs endpoints', () => {
		const app = {} as INestApplication;
		const swaggerDocument = { openapi: '3.0.0' };
		const swaggerConfig = { built: true };
		const setTitle = jest
			.spyOn(DocumentBuilder.prototype, 'setTitle')
			.mockReturnThis();
		const setDescription = jest
			.spyOn(DocumentBuilder.prototype, 'setDescription')
			.mockReturnThis();
		const setVersion = jest
			.spyOn(DocumentBuilder.prototype, 'setVersion')
			.mockReturnThis();
		const addBearerAuth = jest
			.spyOn(DocumentBuilder.prototype, 'addBearerAuth')
			.mockReturnThis();
		const build = jest
			.spyOn(DocumentBuilder.prototype, 'build')
			.mockReturnValue(swaggerConfig as never);
		const createDocument = jest
			.spyOn(SwaggerModule, 'createDocument')
			.mockReturnValue(swaggerDocument as never);
		const setup = jest.spyOn(SwaggerModule, 'setup').mockImplementation();

		setupSwagger(app);

		expect(setTitle).toHaveBeenCalledWith('API Gateway');
		expect(setDescription).toHaveBeenCalledWith(
			'API Gateway for handling requests'
		);
		expect(setVersion).toHaveBeenCalledWith('1.0.0');
		expect(addBearerAuth).toHaveBeenCalled();
		expect(build).toHaveBeenCalled();
		expect(createDocument).toHaveBeenCalledWith(app, swaggerConfig);
		expect(setup).toHaveBeenCalledWith('docs', app, swaggerDocument, {
			yamlDocumentUrl: '/openapi.yaml',
			jsonDocumentUrl: '/openapi.json',
		});
	});
});
