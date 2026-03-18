describe('main bootstrap', () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it('boots the app, configures swagger and starts listening', async () => {
		const createDocument = jest.fn().mockReturnValue({ openapi: '3.0.0' });
		const setup = jest.fn();
		const setTitle = jest.fn().mockReturnThis();
		const setDescription = jest.fn().mockReturnThis();
		const setVersion = jest.fn().mockReturnThis();
		const addBearerAuth = jest.fn().mockReturnThis();
		const build = jest.fn().mockReturnValue({ built: true });
		const listen = jest.fn().mockResolvedValue(undefined);
		const enableCors = jest.fn();
		const get = jest.fn();
		const getOrThrow = jest.fn((key: string) => {
			switch (key) {
				case 'HTTP_CORS':
					return 'https://a.example,https://b.example';
				case 'HTTP_PORT':
					return 3000;
				case 'HTTP_HOST':
					return 'http://localhost:3000';
				default:
					throw new Error(`Unexpected config key: ${key}`);
			}
		});
		const log = jest.fn();

		get.mockReturnValue({ getOrThrow });

		const app = {
			get,
			enableCors,
			listen,
		};

		jest.doMock('@nestjs/core', () => ({
			NestFactory: {
				create: jest.fn().mockResolvedValue(app),
			},
		}));
		jest.doMock('@nestjs/common', () => {
			const actual = jest.requireActual('@nestjs/common');

			return {
				...actual,
				Logger: jest.fn().mockImplementation(() => ({ log })),
			};
		});
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

		jest.isolateModules(() => {
			require('../main');
		});

		await Promise.resolve();
		await Promise.resolve();

		expect(enableCors).toHaveBeenCalledWith({
			origin: ['https://a.example', 'https://b.example'],
			credentials: true,
		});
		expect(setTitle).toHaveBeenCalledWith('API Gateway');
		expect(setDescription).toHaveBeenCalledWith(
			'API Gateway for handling requests',
		);
		expect(setVersion).toHaveBeenCalledWith('1.0.0');
		expect(addBearerAuth).toHaveBeenCalled();
		expect(build).toHaveBeenCalled();
		expect(createDocument).toHaveBeenCalledWith(app, { built: true });
		expect(setup).toHaveBeenCalledWith('docs', app, { openapi: '3.0.0' }, {
			yamlDocumentUrl: '/openapi.yaml',
			jsonDocumentUrl: '/openapi.json',
		});
		expect(listen).toHaveBeenCalledWith(3000);
		expect(log).toHaveBeenNthCalledWith(
			1,
			'API Gateway started at http://localhost:3000:3000',
		);
		expect(log).toHaveBeenNthCalledWith(
			2,
			'Swagger started at http://localhost:3000/docs',
		);
	});
});
