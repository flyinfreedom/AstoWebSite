import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { IApiResponse } from './interfaces'
export class BaseHttpHandler {
  private http: AxiosInstance;
  private requestConfig: AxiosRequestConfig = { };

  constructor (baseURL: string = '', requestConfig: AxiosRequestConfig = {}) {
    this.http = axios.create({
      baseURL,
      ...requestConfig,
      paramsSerializer (params) {
        return qs.stringify(params, { skipNulls: true, allowDots: true })
      }
    });

    ['get', 'post', 'put', 'delete'].forEach((method) => {
      this[method] = this.baseRequest.bind(this, method)
    })

    this.http.interceptors.response.use(this.responseSuccess, this.responseError)
  }

  request (config: AxiosRequestConfig): Promise<any> {
    return this.http.request(config)
  }

  qs (request, config?): string {
    return qs.stringify(request, config || { skipNulls: true, allowDots: true })
  }

  responseError (error): void {
    Promise.reject(error.response)
  }

  responseSuccess (v: AxiosResponse) {
    return v.data
  }

  get<T> (url: string, requestData: any = {}, requestConfig: AxiosRequestConfig = {}): Promise<any> {
    return this.baseRequest<T>('get', url, requestData, requestConfig)
  }

  post<T> (url: string, requestData: any = {}, requestConfig: AxiosRequestConfig = {}): Promise<any> {
    return this.baseRequest<T>('post', url, requestData, requestConfig)
  }

  put<T> (url: string, requestData: any = {}, requestConfig: AxiosRequestConfig = {}): Promise<any> {
    return this.baseRequest<T>('put', url, requestData, requestConfig)
  }

  delete<T> (url: string, requestData: any = {}, requestConfig: AxiosRequestConfig = {}): Promise<any> {
    return this.baseRequest<T>('delete', url, requestData, requestConfig)
  }

  private baseRequest<T> (
    method,
    url: string,
    requestData = {},
    requestConfig: AxiosRequestConfig = {}
  ): Promise<IApiResponse<T>> {
    const params = method === 'get' || method === 'delete' ? requestData : undefined
    const data = method === 'post' || method === 'put' ? requestData : undefined
    const options: AxiosRequestConfig = { url, method, params, data, ...requestConfig }
    return this.http.request(options)
  }
}

export default BaseHttpHandler
