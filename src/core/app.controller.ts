import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { HealthCheckResponseDto } from './dto';

@Controller()
export class AppController {
	@ApiOperation({
		summary: 'Healthcheck endpoint',
		description: 'Returns the status of the API Gateway',
	})
	@ApiOkResponse({
		type: HealthCheckResponseDto,
	})
	@Get('/health')
	heathCheck() {
		return { status: 'ok', timestamp: new Date().toISOString() };
	}
}
