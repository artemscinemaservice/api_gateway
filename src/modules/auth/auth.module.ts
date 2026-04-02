import { PROTO_PATH } from '@artemscinemaservice/contracts';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_TOKEN } from 'src/core/utils';

import { AuthController } from './auth.controller';
import { AuthClientGrpc } from './auth.grpc';

@Module({
	controllers: [AuthController],
	providers: [AuthClientGrpc],
	imports: [
		ClientsModule.registerAsync([
			{
				name: AUTH_SERVICE_TOKEN,
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'auth.v1',
						protoPath: PROTO_PATH.AUTH,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
})
export class AuthModule {}
