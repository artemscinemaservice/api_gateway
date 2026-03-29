import { IdentifierValidator } from "@/shared/validators";
import { ApiProperty } from "@nestjs/swagger";
import { Validate, IsString, IsEnum, IsNotEmpty, Length } from "class-validator";

export class VerifyOtpRequest{
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


        @IsString()
        @IsNotEmpty()
        @Length(8)
        @ApiProperty({
            example: 'UI234POR',
            description:
                'OTP code',
        })
        public code: string
}