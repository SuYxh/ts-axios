import { isDate, isObject } from './util'

function encode(val: string): string {
  // 特殊字符不进行编码
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function huildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  // params 为一个对象
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果当前 key 对应的值为 null ，跳过对当前 key 的处理
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = []
    // 把 val 转换成数组 统一处理
    if (Array.isArray(val)) {
      values = val
      // 修改一下 key 值
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        // 处理 date 类型的val
        val = val.toISOString()
      } else if (isObject(val)) {
        // 处理 Object 类型的val
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  // serializedParams 不一定会存在
  if (serializedParams) {
    // 处理hash标识
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 进行拼接操作， 原来的url上可能已经存在了 参数 ，需要处理
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
