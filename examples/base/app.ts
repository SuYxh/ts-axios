import axios from '../../src/index'

function testRequestParams() {
  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: ['bar', 'baz']
    }
  })

  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: {
        bar: 'baz'
      }
    }
  })

  const date = new Date()

  axios({
    method: 'get',
    url: '/base/get',
    params: {
      date
    }
  })

  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: '@:$, '
    }
  })

  axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: 'bar',
      baz: null
    }
  })

  axios({
    method: 'get',
    url: '/base/get#hash',
    params: {
      foo: 'bar'
    }
  })

  axios({
    method: 'get',
    url: '/base/get?foo=bar',
    params: {
      bar: 'baz'
    }
  })
}

function testRequestData() {
  axios({
    method: 'post',
    url: '/base/post',
    data: {
      a: 1,
      b: 2
    }
  })

  axios({
    method: 'post',
    url: '/base/post',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    data: {
      a: 1,
      b: 2
    }
  })

  const arr = new Int32Array([21, 31])

  axios({
    method: 'post',
    url: '/base/buffer',
    data: arr
  })

  const paramsString = 'q=URLUtils.searchParams&topic=api'
  const searchParams = new URLSearchParams(paramsString)

  axios({
    method: 'post',
    url: '/base/post',
    data: searchParams
  })
}

function testReponse() {
  axios({
    method: 'post',
    url: '/base/post',
    data: {
      a: 1,
      b: 2
    }
  }).then(res => {
    // 因为没有设置 responseType 所以 res.data 是个 字符串 
    // headers 为一个字符串
    console.log(res)
  })

  axios({
    method: 'post',
    url: '/base/post',
    responseType: 'json',
    data: {
      a: 3,
      b: 4
    }
  }).then(res => {
    console.log(res)
  })
}

// testRequestParams()

// testRequestData()

testReponse()
