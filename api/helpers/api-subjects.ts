import { Subject } from 'rxjs'
import { IApiError, IApiMonitor } from './interfaces'

export const apiMonitorSubject: Subject<IApiMonitor> = new Subject<IApiMonitor>()
export const apiErrorSubject: Subject<IApiError> = new Subject<IApiError>()
export default apiMonitorSubject
