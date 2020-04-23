import { noop } from './util'

const ua = (navigator || {}).userAgent || (navigator || {}).swuserAgent
let _systemInfo = null
let _onLine

class Navigator {
  isCanvasPlus = true
  isAppXCanvasPlus = true

  appStartDraw = false // TinyX 的主调度是否已开始渲染
  appFPS = 60
  appDefaultFPS = 60
  // 支付宝：Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E269 ChannelId(0) Nebula  AlipayDefined() AliApp(AP/10.1.55) AlipayClient/10.1.55 AlipayIDE/Worker/0.60.87
  // 手淘：Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E269 ChannelId(0) Nebula  AlipayDefined() AliApp(AP/10.1.55) AlipayClient/10.1.55 AlipayIDE Taobao/11457110/Worker/0.60.87
  userAgent = ua || ''

  // app: "alipay"
  // brand: "iPhone"
  // currentBattery: "-100%"
  // fontSizeSetting: 16
  // language: "zh-Hans"
  // model: "x86_64"
  // pixelRatio: 2
  // platform: "iOS"
  // screenHeight: 667
  // screenWidth: 375
  // statusBarHeight: 20
  // storage: "233.57 GB"
  // system: "10.1"
  // titleBarHeight: 44
  // transparentTitle: false
  // version: "10.1.52.00004380"
  // windowHeight: 603
  // windowWidth: 375
  systemInfoAsync() {
    return new Promise((resolve, reject) => {
      if (_systemInfo) {
        resolve(_systemInfo)
      } else {
        my.getSystemInfo({
          success: (res) => {
            _systemInfo = res
            resolve(res)
          },
          fail: () => {
            _systemInfo = null
            reject()
          },
        })
      }
    })
  }

  get systemInfo() {
    if (!_systemInfo) {
      _systemInfo = my.getSystemInfoSync({
        windowHeight: true,
        windowWidth: true,
        screenHeight: true,
        screenWidth: true,
        platform: true,
      })
    }

    return _systemInfo
  }

  // TODO 用 my.getLocation 来封装 geolocation
  get geolocation() {
    return null
  }

  // system: "10.1"
  get systemVersion() {
    const { system } = this.systemInfo

    return system
  }

  // brand: "iPhone"
  get brand() {
    const { brand } = this.systemInfo

    return brand
  }

  // language: "zh-Hans"
  get language() {
    const { language } = this.systemInfo

    return language
  }

  // platform: "iOS"
  get platform() {
    let { platform } = this.systemInfo

    if (/AlipayIDE/g.test(ua)) {
      platform = 'devtools'
    }

    return platform
  }

  // version: "10.1.52.00004380"
  get appVersion() {
    const { version } = this.systemInfo

    return version
  }

  // transparentTitle: false
  get transparentTitle() {
    const { transparentTitle } = this.systemInfo

    return transparentTitle
  }

  // titleBarHeight: 44
  get titleBarHeight() {
    const { titleBarHeight } = this.systemInfo

    return titleBarHeight
  }

  // statusBarHeight: 20
  get statusBarHeight() {
    const { statusBarHeight } = this.systemInfo

    return statusBarHeight
  }

  // TODO 用 my.getNetworkType 和 my.onNetworkStatusChange 来返回真实的状态
  get onLine() {
    if (_onLine !== void 0) { // eslint-disable-line
      return _onLine
    }
    return 'Unknown'
  }
}

const _navigator = new Navigator()

export default _navigator
