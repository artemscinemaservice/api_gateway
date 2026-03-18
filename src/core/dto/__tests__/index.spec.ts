import * as dtoExports from '../index';
import * as responseExports from '../responses';
import { HealthCheckResponseDto } from '../responses';

describe('dto barrel exports', () => {
	it('re-exports response DTOs from the top-level dto barrel', () => {
		expect(dtoExports.HealthCheckResponseDto).toBe(HealthCheckResponseDto);
	});

	it('re-exports response DTOs from the responses barrel', () => {
		expect(responseExports.HealthCheckResponseDto).toBe(
			HealthCheckResponseDto
		);
	});
});
