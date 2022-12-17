import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { huildURL } from './helpers/url'

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

export default axios
