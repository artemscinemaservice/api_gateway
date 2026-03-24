import { type ValidationPipeOptions } from '@nestjs/common';

export const getValidationPipeConfig = (): ValidationPipeOptions => ({
	transform: true,
	whitelist: true,
});
