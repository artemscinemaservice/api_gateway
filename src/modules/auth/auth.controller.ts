import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthClientGrpc } from './auth.grpc';
import { SendOtpRequest, VerifyOtpRequest } from './dto';

@Controller('auth')
export class AuthController {
	public constructor(private readonly authClientGrpc: AuthClientGrpc) {}


	@ApiOperation({
		summary: 'Send OTP to the specified identifier (phone or email)',
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.authClientGrpc.sendOtp(dto);
	}

	@ApiOperation({
		summary: 'Get OTP-code and if it is valid return access token',
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.authClientGrpc.verifyOtp(dto);
	}
}
