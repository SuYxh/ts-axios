import { isPlainObject } from './util'

/**
 * @description: 处理 headers 里 字段名称 的大小写问题
 * @param {any} headers
 * @param {string} normalizeName
 * @return {*}
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toLocaleUpperCase() === normalizeName.toLocaleUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * @description:  处理 headers ， 参数 data 为对象的时候才处理
 * @param {any} headers
 * @param {any} data
 * @return {*}
 */
export function processHeaders(headers: any, data: any): any {
  // 传入的配置项中 Content-Type 可能为 content-type, normalizeHeaderName() 方法将  content-type 对应的值 给到 Content-Type ， 并删除 content-type 项
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    // 没有配置 Content-Type
    console.log("headers && headers['Content-Type']", headers && headers['Content-Type'])
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
