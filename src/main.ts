import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './core/app.module';
import { getCorsConfig, setupSwagger } from './core/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		})
	);

	const config = app.get(ConfigService);
	const logger = new Logger();

	app.enableCors(getCorsConfig(config));
	setupSwagger(app);

	const port = config.getOrThrow<number>('HTTP_PORT');
	const host = config.getOrThrow<string>('HTTP_HOST');

	await app.listen(port);

	logger.log(`API Gateway started at ${host}:${port}`);
	logger.log(`Swagger started at ${host}/docs`);
}
bootstrap();
