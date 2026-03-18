import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
	@ApiProperty({
		example: 'ok',
	})
	status!: string;

	@ApiProperty({
		example: '2026-03-18T16:15:37.045Z',
	})
	timestamp!: string;
}
