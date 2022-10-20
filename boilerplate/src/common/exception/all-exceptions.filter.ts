import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from 'src/libs/error';
import { ErrorCode } from 'src/libs/http-response';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let result = {};
    let status;
    if (exception instanceof BaseError) {
      result = {
        errorCode: exception.errorCode,
        name: exception.name,
        message: exception.message,
      };
      status = exception.errorCode.status;
    } else if (exception instanceof NotFoundException) {
      result = {
        errorCode: ErrorCode.NOT_FOUND_API,
        name: (<Error>exception).name,
        message: (<Error>exception).message,
      };
      status = ErrorCode.NOT_FOUND_API.status;
    } else {
      result = {
        errorCode: ErrorCode.SERVER_ERROR,
        name: (<Error>exception).name,
        message: (<Error>exception).message,
      };
      status = ErrorCode.SERVER_ERROR.status;
    }

    return response.status(status).json({
      ...result,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
