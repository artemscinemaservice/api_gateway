describe('main bootstrap', () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it('boots the app, configures global pipes, cors, swagger and starts listening', async () => {
		const listen = jest.fn().mockResolvedValue(undefined);
		const enableCors = jest.fn();
		const useGlobalPipes = jest.fn();
		const get = jest.fn();
		const getCorsConfig = jest.fn().mockReturnValue({
			origin: ['https://a.example', 'https://b.example'],
			credentials: true,
		});
		const setupSwagger = jest.fn();
		const getOrThrow = jest.fn((key: string) => {
			if (key === 'HTTP_PORT') {
				return 3000;
			}

			if (key === 'HTTP_HOST') {
				return 'http://localhost:3000';
			}

			throw new Error(`Unexpected config key: ${key}`);
		});
		const log = jest.fn();
		const validationPipeConfig: Record<string, unknown>[] = [];

		get.mockReturnValue({ getOrThrow });

		const app = {
			get,
			enableCors,
			listen,
			useGlobalPipes,
		};

		jest.doMock('@nestjs/core', () => ({
			NestFactory: {
				create: jest.fn().mockResolvedValue(app),
			},
		}));
		jest.doMock('../core/app.module', () => ({
			AppModule: class AppModule {},
		}));
		jest.doMock('@nestjs/common', () => {
			const actual = jest.requireActual('@nestjs/common');

			return {
				...actual,
				Logger: jest.fn().mockImplementation(() => ({ log })),
				ValidationPipe: jest.fn().mockImplementation(config => {
					validationPipeConfig.push(config);
					return { config };
				}),
			};
		});
		jest.doMock('../core/config', () => ({
			getCorsConfig,
			setupSwagger,
		}));

		jest.isolateModules(() => {
			require('../main');
		});

		await Promise.resolve();
		await Promise.resolve();

		expect(useGlobalPipes).toHaveBeenCalledTimes(1);
		expect(validationPipeConfig).toEqual([
			{
				transform: true,
				whitelist: true,
			},
		]);
		expect(getCorsConfig).toHaveBeenCalledWith({ getOrThrow });
		expect(enableCors).toHaveBeenCalledWith({
			origin: ['https://a.example', 'https://b.example'],
			credentials: true,
		});
		expect(setupSwagger).toHaveBeenCalledWith(app);
		expect(listen).toHaveBeenCalledWith(3000);
		expect(log).toHaveBeenNthCalledWith(
			1,
			'API Gateway started at http://localhost:3000:3000'
		);
		expect(log).toHaveBeenNthCalledWith(
			2,
			'Swagger started at http://localhost:3000/docs'
		);
	});
});
