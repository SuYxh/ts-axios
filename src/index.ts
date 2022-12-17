import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './xhr'
import { huildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * @description: 在调用 axios 之前处理参数
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // header 要放在 data 处理之前， 因为在处理 data 的时候， data 已经被转换成字符串了
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * @description: 转换url
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return huildURL(url, params)
}

/**
 * @description: 转换请求的data
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

/**
 * @description: 转换响应的 data
 * @param {AxiosResponse} res
 * @return {*}
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

/**
 * @description: 处理 headers
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
