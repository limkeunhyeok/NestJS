import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from './error';

export class HttpResponse {
  /**
   * HttpStatus 200 Response
   * @param res
   * @param result
   * HttpStatus:
   *   CONTINUE = 100,
   *   SWITCHING_PROTOCOLS = 101,
   *   PROCESSING = 102,
   *   EARLYHINTS = 103,
   *   OK = 200,
   *   CREATED = 201,
   *   ACCEPTED = 202,
   *   NON_AUTHORITATIVE_INFORMATION = 203,
   *   NO_CONTENT = 204,
   *   RESET_CONTENT = 205,
   *   PARTIAL_CONTENT = 206,
   *   AMBIGUOUS = 300,
   *   MOVED_PERMANENTLY = 301,
   *   FOUND = 302,
   *   SEE_OTHER = 303,
   *   NOT_MODIFIED = 304,
   *   TEMPORARY_REDIRECT = 307,
   *   PERMANENT_REDIRECT = 308,
   *   BAD_REQUEST = 400,
   *   UNAUTHORIZED = 401,
   *   PAYMENT_REQUIRED = 402,
   *   FORBIDDEN = 403,
   *   NOT_FOUND = 404,
   *   METHOD_NOT_ALLOWED = 405,
   *   NOT_ACCEPTABLE = 406,
   *   PROXY_AUTHENTICATION_REQUIRED = 407,
   *   REQUEST_TIMEOUT = 408,
   *   CONFLICT = 409,
   *   GONE = 410,
   *   LENGTH_REQUIRED = 411,
   *   PRECONDITION_FAILED = 412,
   *   PAYLOAD_TOO_LARGE = 413,
   *   URI_TOO_LONG = 414,
   *   UNSUPPORTED_MEDIA_TYPE = 415,
   *   REQUESTED_RANGE_NOT_SATISFIABLE = 416,
   *   EXPECTATION_FAILED = 417,
   *   I_AM_A_TEAPOT = 418,
   *   MISDIRECTED = 421,
   *   UNPROCESSABLE_ENTITY = 422,
   *   FAILED_DEPENDENCY = 424,
   *   TOO_MANY_REQUESTS = 429,
   *   INTERNAL_SERVER_ERROR = 500,
   *   NOT_IMPLEMENTED = 501,
   *   BAD_GATEWAY = 502,
   *   SERVICE_UNAVAILABLE = 503,
   *   GATEWAY_TIMEOUT = 504,
   *   HTTP_VERSION_NOT_SUPPORTED = 505
   */
  public static Ok(@Res() res: Response, result?: Record<string, any>): void {
    res
      .status(HttpStatus.OK)
      .header('Access-Control-Allow-Origin', ['*'])
      .json(result ? result : null);
  }

  public static OkWithoutContents(@Res() res: Response): void {
    res
      .status(HttpStatus.NO_CONTENT)
      .header('Access-Control-Allow-Origin', ['*'])
      .json(null);
  }

  /**
   * HttpStatus 4XX, 5XX Response
   * @param res
   * @param error
   */
  public static Fail(@Res() res: Response, error: BaseError): void {
    const result = {
      errorCode: error.errorCode,
      name: error.name,
      message: error.message,
    };
    res
      .status(error.errorCode.status)
      .header('Access-Control-Allow-Origin', ['*'])
      .json(result);
  }
}

export class ErrorCode {
  public static SCHEMA_VALIDATE = new ErrorCode(
    'SchemaValidate',
    HttpStatus.BAD_REQUEST,
  );
  public static NOT_FOUND_API = new ErrorCode(
    'NotFoundApi',
    HttpStatus.NOT_FOUND,
  );
  public static NOT_FOUND_RESOURCE = new ErrorCode(
    'NotFoundResource',
    HttpStatus.NOT_FOUND,
  );
  public static DUPLICATED_ID = new ErrorCode(
    'DuplicatedId',
    HttpStatus.CONFLICT,
  );
  public static DUPLICATED_NAME = new ErrorCode(
    'DuplicatedName',
    HttpStatus.CONFLICT,
  );
  public static DUPLICATED_RESOURCE = new ErrorCode(
    'DuplicatedResource',
    HttpStatus.CONFLICT,
  );
  public static REQUEST_IN_PROGRESS = new ErrorCode(
    'RequestInProgress',
    HttpStatus.TOO_MANY_REQUESTS,
  );
  public static TOO_MANY_REQUESTS = new ErrorCode(
    'TooManyRequests',
    HttpStatus.TOO_MANY_REQUESTS,
  );
  public static GATEWAY_TIMEOUT = new ErrorCode(
    'GatewayTimeout',
    HttpStatus.GATEWAY_TIMEOUT,
  );
  public static SERVICE_UNAVAILABLE = new ErrorCode(
    'ServiceUnavailable',
    HttpStatus.SERVICE_UNAVAILABLE,
  );
  public static JSON_PARSING = new ErrorCode(
    'JsonParsing',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  public static INVALID_INPUT = new ErrorCode(
    'InvalidInput',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  public static DB_FAIL = new ErrorCode(
    'DBFail',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  public static SERVER_ERROR = new ErrorCode(
    'ServerError',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  public static NEED_AUTHORIZATION_INFO = new ErrorCode(
    'NeedAuthorizationInfo',
    HttpStatus.UNAUTHORIZED,
  );
  public static NEED_LOGIN = new ErrorCode(
    'NeedLogin',
    HttpStatus.UNAUTHORIZED,
  );
  public static LOGIN_FAIL = new ErrorCode(
    'LoginFail',
    HttpStatus.UNAUTHORIZED,
  );
  public static VERIFY_TOKEN_FAIL = new ErrorCode(
    'VerifyTokenFail',
    HttpStatus.UNAUTHORIZED,
  );
  public static EXPIRED_TOKEN = new ErrorCode(
    'ExpiredToken',
    HttpStatus.UNAUTHORIZED,
  );
  public static NEED_REGISTER = new ErrorCode(
    'NeedRegister',
    HttpStatus.UNAUTHORIZED,
  );
  public static NEED_TOKEN = new ErrorCode(
    'NeedToken',
    HttpStatus.UNAUTHORIZED,
  );
  public static AUTHORIZATION_DENY = new ErrorCode(
    'AuthorizationDeny',
    HttpStatus.FORBIDDEN,
  );
  public static GATEWAY_ERROR = new ErrorCode(
    'GatewayError',
    HttpStatus.SERVICE_UNAVAILABLE,
  );
  public static SHORT_OF_CASH = new ErrorCode(
    'ShortOfCash',
    HttpStatus.PAYMENT_REQUIRED,
  );
  public static DATA_SEND_FAIL = new ErrorCode(
    'DataSendFail',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  public static ROLE_PERMISSION = new ErrorCode(
    'RolePermission',
    HttpStatus.FORBIDDEN,
  );
  public static INTERNAL_STATE_VIOLATION = new ErrorCode(
    'StatusPolicyViolation',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  public static BAD_MIMETYPE = new ErrorCode(
    'BadMimetype',
    HttpStatus.BAD_REQUEST,
  );
  public static PARSING_FAIL = new ErrorCode(
    'ParsingFail',
    HttpStatus.NOT_ACCEPTABLE,
  );

  public readonly errorCode: string;
  public readonly statusCode: string;
  public readonly status: number;

  constructor(errorCode: string, eStatusCode: HttpStatus) {
    this.errorCode = errorCode;
    this.status = eStatusCode;
    this.statusCode = HttpStatus[eStatusCode];
  }
}
