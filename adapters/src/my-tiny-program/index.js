import * as win from './window'
import windowProperties from './WindowProperties'

const _window = Object.assign(windowProperties, win)
const global = my

function inject() {
  _window.addEventListener = (type, listener) => {
    _window.document.addEventListener(type, listener)
  }
  _window.removeEventListener = (type, listener) => {
    _window.document.removeEventListener(type, listener)
  }

  if (_window.canvas) {
    _window.canvas.addEventListener = _window.addEventListener
    _window.canvas.removeEventListener = _window.removeEventListener
  }

  global.window = _window
}

if (!my.__isAdapterInjected) {
  my.__isAdapterInjected = true
  inject()
}
