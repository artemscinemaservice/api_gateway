import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('API Gateway')
		.setDescription('API Gateway for handling requests')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml',
		jsonDocumentUrl: '/openapi.json',
	});
};
