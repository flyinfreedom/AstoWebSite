import { StatusCode } from './enums'
import BaseHttpHandler from './base-handler'
export class HttpHandler extends BaseHttpHandler {
  constructor (url, config = {}) {
    super(url, config)
  }

  responseError ({ response }) {
    const { status, statusText, data } = response
    if (status === 400 && typeof (data) === 'object') {
      return {
        statusCode: StatusCode.ValidationError,
        errorMsg: data
      }
    } else if (status === 503) {
      return {
        statusCode: StatusCode.ServiceUnavailable,
        errorMsg: data
      }
    } else {
      return {
        statusCode: StatusCode[status] ? status : StatusCode.UnknowHttpError,
        errorMsg: statusText
      }
    }
  }
}
export default HttpHandler
