import { AppController } from '../app.controller';

describe('AppController', () => {
	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(
			new Date('2026-03-18T16:15:37.045Z')
		);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('returns API health status with an ISO timestamp', () => {
		const controller = new AppController();

		expect(controller.heathCheck()).toEqual({
			status: 'ok',
			timestamp: '2026-03-18T16:15:37.045Z',
		});
	});
});
