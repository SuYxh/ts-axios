import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { huildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
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
 * @description: 处理 headers
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
