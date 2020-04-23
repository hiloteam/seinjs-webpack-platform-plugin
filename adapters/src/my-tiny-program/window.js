export {default as document} from './document'
export {default as navigator} from './navigator'
export {default as XMLHttpRequest} from './XMLHttpRequest'
export {default as Image} from './Image'
export {default as Video} from './Video'
export {default as HTMLElement} from './HTMLElement'
export { default as HTMLMediaElement } from './HTMLMediaElement'
export { default as HTMLAudioElement } from './HTMLAudioElement'
export { default as HTMLCanvasElement } from './HTMLCanvasElement'
export {default as localStorage} from './localStorage'
export {default as location} from './location'
export {default as Worker} from './Worker'
export * from './constructor'
export {initBase64} from './util'

export { setTimeout }
export { setInterval }
export { clearTimeout }
export { clearInterval }

export function requestAnimationFrame(callback) {
  return my.window.mainCanvas.requestAnimationFrame(() => callback(Date.now()))
}

export function cancelAnimationFrame(id) {
  return my.window.mainCanvas.cancelAnimationFrame(id)
}

export function alert(message) {
  my.alert({
    content: message
  })
}
