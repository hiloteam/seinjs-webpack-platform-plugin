import { performance, performanceAsync } from './performance'

let _screenInfo = null

class WindowProperties {
  performance = performance
  performanceAsync = performanceAsync
  ontouchstart = null
  ontouchmove = null
  ontouchend = null
  ontouchcancel = null

  screenInfoAsync() {
    return new Promise((resolve, reject) => {
      if (!_screenInfo ||
        !_screenInfo.windowWidth ||
        !_screenInfo.windowHeight
      ) {
        my.getSystemInfo({
          success: (res) => {
            const {
              windowWidth,
              windowHeight,
              screenWidth,
              screenHeight,
              pixelRatio,
            } = res

            _screenInfo = {
              windowWidth,
              windowHeight,
              screenWidth,
              screenHeight,
              pixelRatio,
            }

            resolve(_screenInfo)
          },
          fail: () => {
            _screenInfo = null
            reject()
          },
          needCache: false
        })
      } else {
        resolve(_screenInfo)
      }
    })
  }

  get screenInfo() {
    if (
      !_screenInfo ||
      !_screenInfo.windowWidth ||
      !_screenInfo.windowHeight
    ) {
      const {
        windowWidth,
        windowHeight,
        screenWidth,
        screenHeight,
        pixelRatio,
      } = my.getSystemInfoSync({
        windowHeight: true,
        windowWidth: true,
        screenHeight: true,
        screenWidth: true,
        platform: true,
        needCache: false
      })

      _screenInfo = {
        windowWidth,
        windowHeight,
        screenWidth,
        screenHeight,
        pixelRatio,
      }
    }

    return _screenInfo
  }

  get pixelRatio() {
    const { pixelRatio } = this.screenInfo

    return pixelRatio
  }

  get devicePixelRatio() {
    const { pixelRatio } = this.screenInfo

    return pixelRatio
  }

  get innerWidth() {
    const { windowWidth } = this.screenInfo

    return windowWidth
  }

  get innerHeight() {
    const { windowHeight } = this.screenInfo

    return windowHeight
  }

  get screen() {
    const {
      windowWidth,
      windowHeight,
      screenWidth,
      screenHeight,
    } = this.screenInfo

    return {
      availWidth: windowWidth,
      availHeight: windowHeight,
      screenWidth,
      screenHeight,
    }
  }
}

const windowProperties = new WindowProperties()

export default windowProperties
