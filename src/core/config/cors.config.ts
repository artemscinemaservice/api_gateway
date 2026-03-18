import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService): CorsOptions => ({
	origin: configService.getOrThrow<string>('HTTP_CORS').split(','),
	credentials: true,
});
