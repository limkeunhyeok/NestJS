export const LogCategory = {
  Initializer: 'Initializer',
  BaseTransfer: 'BaseTransfer',
  UnhandledError: 'UnhandledError',
  HttpRequest: 'HttpRequest',
  HttpResponse: 'HttpResponse',
  HttpException: 'HttpException',
  DBFail: 'DBFail',
  DataResource: 'DataResource',
  JsonWebToken: 'JsonWebToken',
  Account: 'Account',
  Permission: 'Permission',
  Parsing: 'Parsing',
} as const;

export type LogCategory = typeof LogCategory[keyof typeof LogCategory];
