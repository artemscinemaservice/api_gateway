import { HealthCheckResponseDto } from './healthcheck.response.dto';

describe('HealthCheckResponseDto', () => {
	it('can be used as the healthcheck response shape', () => {
		const response = new HealthCheckResponseDto();
		response.status = 'ok';
		response.timestamp = '2026-03-18T16:15:37.045Z';

		expect(response).toEqual({
			status: 'ok',
			timestamp: '2026-03-18T16:15:37.045Z',
		});
	});
});
