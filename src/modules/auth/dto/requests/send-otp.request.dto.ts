import { ApiProperty } from '@nestjs/swagger';

export class SendOtpRequestDto {
	@ApiProperty({
		example: '+1234567890', // Example for phone number
		description:
			'The identifier to which the OTP will be sent. It can be either a phone number or an email address.',
	})
	public identifier: string;

	@ApiProperty({
		example: 'phone',
		description: 'The type of identifier to which the OTP will be sent.',
	})
	public type: 'phone' | 'email';
}
