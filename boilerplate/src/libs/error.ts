import { IResponsibleError } from 'src/common/interfaces/error.interface';
import { ErrorCode } from './http-response';

process.on('unhandledRejection', (err) => {
  if (err instanceof BaseError) {
    throw err;
  }
  throw new BaseError('', err as Error);
});

export class BaseError extends Error implements IResponsibleError {
  errorCode: ErrorCode;

  constructor(message?: string, error?: Error, errorCode?: ErrorCode) {
    super(message);
    this.errorCode = errorCode ?? ErrorCode.SERVER_ERROR;
    Object.setPrototypeOf(this, new.target.prototype);
    if (error) {
      this.name = error.name;
      this.message = error.message;
      this.stack = error.stack;
    } else {
      this.name = Object.getPrototypeOf(this).constructor.name;
      this.message = String(message);
    }
  }
}
