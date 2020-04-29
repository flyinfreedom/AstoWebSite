import { Subject } from 'rxjs'

export interface IApiResponse<T> {
  statusCode: string;
  errorMsg: string;
  errors?: { [key: string]: string };
  node?: any;
  data: T;
}

export interface IHandlerConfig {
  isHandleStatus400ValidationError: boolean;
  isHandleNot200Error: boolean;
}

export interface IApiError {
  status: number;
  message: string;
}

export interface IApiMonitor {
  name: string;
  status: boolean;
  onError?: boolean,
}

export interface IErrorHandlerConfig {
  badRequestHandler: (vue, errorSubs: IApiError) => Promise<void>;
  catchedErrorHandler: (vue, errorSubs: IApiError) => Promise<void>;
  unauthorizedHandler: (vue, errorSubs: IApiError) => Promise<void>;
  validationErrorHandler: (vue, errorSubs: IApiError) => Promise<void>;
  unknowErrorHandler: (vue, errorSubs: IApiError) => Promise<void>;
  inertnalErrorHandler: (vue, errorSubs: IApiError) => Promise<void>;
  baseRx: (vue, errorSubs: Subject<IApiError>) => Promise<void>;
  baseError: (vue, errorSubs: IApiError) => Promise<void>;
  baseSuccess: (vue, errorSubs: IApiError) => Promise<void>;
}

export interface IFilterConfig {
  dateTimeFormat: string;
  amountFormat: number;
}
