import axios from '../../src/index'

axios.interceptors.request.use(config => {
  console.log('request-1')
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  console.log('request-2')
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  console.log('request-3')
  return config
})

axios.interceptors.response.use(res => {
  console.log('response-1')
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  console.log('response-2')
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  console.log('response-3')
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res)
  console.log(res.data)
})
