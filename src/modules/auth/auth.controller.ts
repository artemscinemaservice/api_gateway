import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthClientGrpc } from './auth.grpc';
import { SendOtpRequest } from './dto';

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
}
