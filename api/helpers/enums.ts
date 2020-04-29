
export enum StatusCode {
  Success = 0,
  ValidationError = 1,
  CatchedError = 2,

  // HTTP ERROR
  BadRequest = 400,
  Unauthorized = 401,
  Gone = 410,
  InertnalError = 500,
  ServiceUnavailable = 503,
  UnknowHttpError = 9999,
}
