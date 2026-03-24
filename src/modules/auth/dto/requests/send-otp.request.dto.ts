import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Validate } from 'class-validator';
import { IdentifierValidator } from 'src/shared/validators';

export class SendOtpRequest {
	@Validate(IdentifierValidator)
	@IsString()
	@ApiProperty({
		example: '+1234567890', // Example for phone number
		description:
			'The identifier to which the OTP will be sent. It can be either a phone number or an email address.',
	})
	public identifier: string;

	@IsEnum(['phone', 'email'], {
		message: 'Type must be either "phone" or "email"',
	})
	@ApiProperty({
		example: 'phone',
		description: 'The type of identifier to which the OTP will be sent.',
		enum: ['phone', 'email'],
	})
	public type: 'phone' | 'email';
}
