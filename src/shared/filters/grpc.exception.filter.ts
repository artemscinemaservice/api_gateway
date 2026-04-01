import {
	ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import type { Response } from 'express'
import { RpcStatus } from '@artemscinemaservice/core/enums'

import { grpcToHttpStatus } from '../utils'



type GrpcError = {
	code: RpcStatus;
	details?: string;
	message?: string;
};

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	public catch(exception: unknown, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		if (this.isGrpcError(exception)) {
			const httpStatus = grpcToHttpStatus[exception.code] ?? 500;

			return response.status(httpStatus).json({
				statusCode: httpStatus,
				message: exception.details ?? exception.message ?? 'gRPC error',
			});
		}

		if (exception instanceof HttpException) {
			const httpStatus = exception.getStatus();
			return response.status(httpStatus).json({
				statusCode: httpStatus,
				message: exception.message ?? 'Internal server error',
			});
		}

		return response.status(500).json({
			statusCode: 500,
			message: 'Internal server error',
		});
	}

	private isGrpcError(error: unknown): error is GrpcError {
		return (
			typeof error === 'object' &&
			error !== null &&
			'code' in error &&
			typeof (error as any).code === 'number'
		);
	}
}
