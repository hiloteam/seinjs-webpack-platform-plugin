import CommonComputedStyle from '../wx-mini-game/style/CommonComputedStyle'
import getImageComputedStyle from '../wx-mini-game/style/ImageComputedStyle'
import getCanvasComputedStyle from '../wx-mini-game/style/CanvasComputedStyle'
import Event from '../wx-mini-game/Event'
import HTMLCanvasElement from './HTMLCanvasElement'

export { default as navigator } from '../wx-mini-game/navigator'
export { default as XMLHttpRequest } from '../wx-mini-game/XMLHttpRequest'
export { default as WebSocket } from '../wx-mini-game/WebSocket'
export { default as Worker } from '../wx-mini-game/Worker'
export { default as Image } from './Image'
export { default as ImageBitmap } from '../wx-mini-game/ImageBitmap'
export { default as Audio } from '../wx-mini-game/Audio'
export { default as FileReader } from '../wx-mini-game/FileReader'
export { default as Element } from '../wx-mini-game/Element'
export { default as HTMLElement } from '../wx-mini-game/HTMLElement'
export { default as HTMLMediaElement } from '../wx-mini-game/HTMLMediaElement'
export { default as HTMLAudioElement } from '../wx-mini-game/HTMLAudioElement'
export { default as HTMLVideoElement } from '../wx-mini-game/HTMLVideoElement'
export { default as WebGLRenderingContext } from '../wx-mini-game/WebGLRenderingContext'
export { default as localStorage } from '../wx-mini-game/localStorage'
export { default as location } from '../wx-mini-game/location'
export { default as fetch } from './fetch'
export { btoa, atob } from '../wx-mini-game/Base64.js'
export { default as Symbol } from '../wx-mini-game/Symbol'
export * from '../wx-mini-game/WindowProperties'
export {initBase64} from '../my-tiny-program/util'
export { HTMLCanvasElement }
export * from '../my-tiny-program/constructor'

function getComputedStyle(dom) {
    const tagName = dom.tagName;

    if (tagName === "CANVAS") {
        return getCanvasComputedStyle(dom);
    } else if (tagName === "IMG") {
        return getImageComputedStyle(dom);
    }

    return CommonComputedStyle;
}

function scrollTo(x, y) {
    // x = Math.min(window.innerWidth, Math.max(0, x));
    // y = Math.min(window.innerHeight, Math.max(0, y));
    // We can't scroll the page of WeChatTinyGame, so it'll always be 0.

    // window.scrollX = 0;
    // window.scrollY = 0;
}

function scrollBy(dx, dy) {
    window.scrollTo(window.scrollX + dx, window.scrollY + dy);
}

// function requestAnimationFrame(callback) {
//     return my.window.mainCanvas.requestAnimationFrame(() => callback(Date.now()))
// }

// function cancelAnimationFrame(id) {
//     return my.window.mainCanvas.cancelAnimationFrame(id)
// }

function alert(message) {
    wx.alert({
        content: message
    });
}
  

function focus() {}

function blur() {}

function eventHandlerFactory() {
    return (res) => {
        const event = new Event('resize')

        event.target = window;
        event.timeStamp = Date.now();
        event.res = res;
        event.windowWidth = res.windowWidth;
        event.windowHeight = res.windowHeight;
        document.dispatchEvent(event);
    }
}

if (wx.onWindowResize) {
    wx.onWindowResize(eventHandlerFactory())
}

const _setTimeout = setTimeout;
const _clearTimeout = clearTimeout;
const _setInterval = setInterval;
const _clearInterval = clearInterval;

function requestAnimationFrame(callback) {
    return wx.window.mainCanvas.requestAnimationFrame(() => callback(Date.now()))
}
  
function cancelAnimationFrame(id) {
    return wx.window.mainCanvas.cancelAnimationFrame(id)
}

export {
    alert,
    focus,
    blur,
    getComputedStyle,
    scrollTo,
    scrollBy,

    _setTimeout as setTimeout,
    _clearTimeout as clearTimeout,
    _setInterval as setInterval,
    _clearInterval as clearInterval,
    requestAnimationFrame,
    cancelAnimationFrame
}
