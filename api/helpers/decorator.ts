
import { IApiError } from './interfaces'
import { StatusCode } from './enums'
import { apiMonitorSubject, apiErrorSubject } from './api-subjects'

export function Confirm (msg) {
  return (_target, _name, descriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = function (...params) {
      const res = confirm(msg)
      if (res) {
        return originalMethod.apply(this, params)
      }
    }
  }
}

export function Interceptor (...args) {
  if (args.length <= 1) {
    return (_target, name, descriptor) => {
      const handleError = !args[0] ? false : args[0].handleError
      const handleSuccess = !args[0] ? false : args[0].handleSuccess
      const monitorApiName = (args[0] && args[0].monitorApiName) ? args[0].monitorApiName : name
      const originalMethod = descriptor.value
      descriptor.value = async function (...params) {
        apiMonitorSubject.next({ name: monitorApiName, status: true })
        const res = await originalMethod.apply(this, params)
        apiMonitorSubject.next({ name: monitorApiName, status: false })
        const { data, statusCode, errorMsg } = res
        if (statusCode || errorMsg) {
          const m: IApiError = {
            status: StatusCode[statusCode] ? statusCode : StatusCode.CatchedError,
            message: typeof handleError === 'string' ? handleError : errorMsg
          }
          handleError && apiErrorSubject.next(m)
          apiMonitorSubject.next({ name: monitorApiName, status: false, onError: true })
          return false
        } else {
          const m: IApiError = {
            status: StatusCode.Success,
            message: handleSuccess
          }
          handleSuccess && apiErrorSubject.next(m)
          return data === null || data === undefined ? true : data
        }
      }
    }
  } else {
    const originalMethod = args[2].value
    args[2].value = async function (...params) {
      const res = await originalMethod.apply(this, params)
      const { data, statusCode, errorMsg } = res
      if (statusCode || errorMsg) {
        return false
      } else {
        return data === null || data === undefined ? true : data
      }
    }
    return args[2]
  }
}
