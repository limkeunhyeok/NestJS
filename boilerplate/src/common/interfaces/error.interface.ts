import { ErrorCode } from 'src/libs/http-response';

export interface IResponsibleError extends Error {
  errorCode: ErrorCode;
}
