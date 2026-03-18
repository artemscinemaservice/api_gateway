describe('setupSwagger', () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it('builds the swagger document and mounts the docs endpoints', () => {
		const createDocument = jest.fn().mockReturnValue({ openapi: '3.0.0' });
		const setup = jest.fn();
		const setTitle = jest.fn().mockReturnThis();
		const setDescription = jest.fn().mockReturnThis();
		const setVersion = jest.fn().mockReturnThis();
		const addBearerAuth = jest.fn().mockReturnThis();
		const build = jest.fn().mockReturnValue({ built: true });
		const app = {} as Parameters<typeof createDocument>[0];

		jest.doMock('@nestjs/swagger', () => {
			const actual = jest.requireActual('@nestjs/swagger');

			return {
				...actual,
				DocumentBuilder: jest.fn().mockImplementation(() => ({
					setTitle,
					setDescription,
					setVersion,
					addBearerAuth,
					build,
				})),
				SwaggerModule: {
					...actual.SwaggerModule,
					createDocument,
					setup,
				},
			};
		});

		let setupSwagger: typeof import('../swagger.config').setupSwagger;

		jest.isolateModules(() => {
			({ setupSwagger } = require('../swagger.config'));
		});

		setupSwagger(app);

		expect(setTitle).toHaveBeenCalledWith('API Gateway');
		expect(setDescription).toHaveBeenCalledWith(
			'API Gateway for handling requests'
		);
		expect(setVersion).toHaveBeenCalledWith('1.0.0');
		expect(addBearerAuth).toHaveBeenCalled();
		expect(build).toHaveBeenCalled();
		expect(createDocument).toHaveBeenCalledWith(app, { built: true });
		expect(setup).toHaveBeenCalledWith(
			'docs',
			app,
			{ openapi: '3.0.0' },
			{
				yamlDocumentUrl: '/openapi.yaml',
				jsonDocumentUrl: '/openapi.json',
			}
		);
	});
});
