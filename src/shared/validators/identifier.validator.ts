import {
	ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface,
} from 'class-validator';
import { SendOtpRequest } from 'src/modules/auth/dto';

@ValidatorConstraint({ name: 'IdentifierValidator', async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
	public validate(
		value: string,
		validationArguments: ValidationArguments
	): boolean {
		const obj = validationArguments.object as SendOtpRequest;

		if (obj.type === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value);
		}

		if (obj.type === 'phone') {
			const phoneRegex = /^\+\d{10,15}$/;
			return phoneRegex.test(value);
		}

		return false;
	}

	public defaultMessage?(validationArguments: ValidationArguments): string {
		const obj = validationArguments.object as SendOtpRequest;
		if (obj.type === 'email') {
			return 'Invalid email format';
		}
		if (obj.type === 'phone') {
			return 'Invalid phone number format';
		}
		return 'Invalid identifier format';
	}
}
