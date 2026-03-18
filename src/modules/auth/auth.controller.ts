import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SendOtpRequestDto } from './dto';

@Controller('auth')
export class AuthController {
	@Post('otp')
	@HttpCode(HttpStatus.OK)
	public async sendOtp(@Body() dto: SendOtpRequestDto) {
		console.log(dto);
		return {
			ok: ' ok',
		};
	}
}
