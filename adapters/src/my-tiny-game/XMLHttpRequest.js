const _url = new WeakMap()
const _method = new WeakMap()
const _requestHeader = new WeakMap()
const _responseHeader = new WeakMap()
const _requestTask = new WeakMap()

function _triggerEvent(type, ...args) {
  if (typeof this[`on${type}`] === 'function') {
    this[`on${type}`].apply(this, args)
  }
}

function _changeReadyState(readyState) {
  this.readyState = readyState
  _triggerEvent.call(this, 'readystatechange')
}

export default class XMLHttpRequest {
  // TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
  static UNSEND = 0
  static OPENED = 1
  static HEADERS_RECEIVED = 2
  static LOADING = 3
  static DONE = 4

  /*
   * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
   */
  onabort = null
  onerror = null
  onload = null
  onloadstart = null
  onprogress = null
  ontimeout = null
  onloadend = null

  onreadystatechange = null
  readyState = 0
  response = null
  responseText = null
  responseType = ''
  responseXML = null
  status = 0
  statusText = ''
  upload = {}
  withCredentials = false

  constructor() {
    _requestHeader.set(this, {
      'content-type': 'application/x-www-form-urlencoded',
    })
    _responseHeader.set(this, {})
  }

  abort() {
    const myRequestTask = _requestTask.get(this)

    if (myRequestTask) {
      myRequestTask.abort()
    }
  }

  getAllResponseHeaders() {
    const responseHeader = _responseHeader.get(this)

    return Object.keys(responseHeader).map((header) => `${header}: ${responseHeader[header]}`).join('\n')
  }

  getResponseHeader(header) {
    return _responseHeader.get(this)[header]
  }

  // async, user, password 这几个参数在小程序内不支持
  open(method, url) {
    _method.set(this, method)
    _url.set(this, url)
    _changeReadyState.call(this, XMLHttpRequest.OPENED)
  }

  overrideMimeType() {}

  send(data = '') {
    if (this.readyState !== XMLHttpRequest.OPENED) {
      throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.")
    } else {
      const url = _url.get(this)

      if (url[0] === '/') {
        this.sendLocalFileRequest(data)
      } else {
        this.sendHTTPRequest(data)
      }
    }
  }

  sendHTTPRequest(data) {
    my.request({
      data,
      url: _url.get(this),
      method: _method.get(this),
      header: _requestHeader.get(this),
      dataType: this.responseType,
      success: ({ data, status, headers }) => {
        if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
          try {
            data = JSON.stringify(data)
          } catch (e) {
            data = data // eslint-disable-line
          }
        }

        this.status = status
        _responseHeader.set(this, headers)
        _triggerEvent.call(this, 'loadstart')
        _changeReadyState.call(this, XMLHttpRequest.HEADERS_RECEIVED)
        _changeReadyState.call(this, XMLHttpRequest.LOADING)

        this.response = data

        if (data instanceof ArrayBuffer) {
          this.responseText = ''
          // const bytes = new Uint8Array(data)
          // const len = bytes.byteLength

          // for (let i = 0; i < len; i++) {
          //   this.responseText += String.fromCharCode(bytes[i])
          // }
        } else {
          this.responseText = data
        }
        _changeReadyState.call(this, XMLHttpRequest.DONE)
        _triggerEvent.call(this, 'load')
        _triggerEvent.call(this, 'loadend')
      },
      fail: (res) => {
        _triggerEvent.call(this, 'error', res)
        _triggerEvent.call(this, 'loadend')
      },
    })
  }

  sendLocalFileRequest(data) {
    const fs = my.getFileSystemManager()
    let url = _url.get(this)
    if (url[0] === '/') {
      // convert to relative path
      url = url.slice(1)
    }
    const method = _method.get(this)
    const headers =  _requestHeader.get(this)
    const dataType = this.responseType

    if (method !== 'GET') {
      _triggerEvent.call(this, 'error', new Error('Only support "GET" method for none-http request now !'))
      _triggerEvent.call(this, 'loadend')
      return
    }

    fs.access({
      path: url,
      success: () => {
        let encoding = ''
        switch (dataType) {
          case 'arraybuffer':
            encoding = undefined
            break
          case 'text':
          case 'json':
            encoding = 'utf8'
            break
          default:
            encoding = 'utf8'
            break
        }
    
        fs.readFile({
          filePath: url,
          encoding,
          success: ({data}) => {
            try {
              if (dataType === 'json') {
                data = JSON.parse(data)
              }
            } catch (error) {
              _triggerEvent.call(this, 'error', error)
              _triggerEvent.call(this, 'loadend')
              return
            }

            this.status = 200
            _responseHeader.set(this, headers)
            _triggerEvent.call(this, 'loadstart')
            _changeReadyState.call(this, XMLHttpRequest.HEADERS_RECEIVED)
            _changeReadyState.call(this, XMLHttpRequest.LOADING)
    
            this.response = data
    
            if (dataType !== 'arraybuffer') {
              this.responseText = data
            } else {
              this.responseText = ''
            }
    
            _changeReadyState.call(this, XMLHttpRequest.DONE)
            _triggerEvent.call(this, 'load')
            _triggerEvent.call(this, 'loadend')
          },
          fail: ({errorMessage}) => {
            _triggerEvent.call(this, 'error', new Error(`Read file error: ${errorMessage}`))
            _triggerEvent.call(this, 'loadend')
          }
        })
      },
      fail: ({errorMessage}) => {
        console.error(`Read file error: ${errorMessage}`, 1);
        _triggerEvent.call(this, 'error', new Error(`Read file error: ${errorMessage}`))
        _triggerEvent.call(this, 'loadend')
      }
    })
  }

  setRequestHeader(header, value) {
    const myHeader = _requestHeader.get(this)

    myHeader[header] = value
    _requestHeader.set(this, myHeader)
  }
}
