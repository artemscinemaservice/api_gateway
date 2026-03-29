import {
	AuthServiceClient,
	type VerifyOtpRequest,
	type SendOtpRequest,
} from '@artemscinemaservice/contracts/gen/auth';
import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE_TOKEN } from 'src/core/utils';

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService: AuthServiceClient;

	public constructor(
		@Inject(AUTH_SERVICE_TOKEN) private readonly client: ClientGrpc
	) {}

	onModuleInit() {
		this.authService =
			this.client.getService<AuthServiceClient>('AuthService');
	}

	public sendOtp(request: SendOtpRequest) {
		return this.authService.sendOtp(request);
	}

	verifyOtp(request: VerifyOtpRequest) {
		return this.authService.verifyOtp(request);
	}
}
