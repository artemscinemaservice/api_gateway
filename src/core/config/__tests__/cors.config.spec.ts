import { getCorsConfig } from '../cors.config';

describe('getCorsConfig', () => {
	it('returns split origins and credentials support', () => {
		const configService = {
			getOrThrow: jest.fn().mockReturnValue('https://a.example,https://b.example'),
		};

		expect(getCorsConfig(configService as never)).toEqual({
			origin: ['https://a.example', 'https://b.example'],
			credentials: true,
		});
		expect(configService.getOrThrow).toHaveBeenCalledWith('HTTP_CORS');
	});
});
