import Canvas, {createNormalCanvas} from './Canvas'

import CommonComputedStyle from './style/CommonComputedStyle'
import getImageComputedStyle from './style/ImageComputedStyle'
import getCanvasComputedStyle from './style/CanvasComputedStyle'
import Event from './Event'
import HTMLCanvasElement from './HTMLCanvasElement'

export { default as navigator } from './navigator'
export { default as XMLHttpRequest } from './XMLHttpRequest'
export { default as WebSocket } from './WebSocket'
export { default as Worker } from './Worker'
export { default as Image } from './Image'
export { default as ImageBitmap } from './ImageBitmap'
export { default as Audio } from './Audio'
export { default as FileReader } from './FileReader'
export { default as Element } from './Element'
export { default as HTMLElement } from './HTMLElement'
export { default as HTMLImageElement } from './HTMLImageElement'
export { default as HTMLMediaElement } from './HTMLMediaElement'
export { default as HTMLAudioElement } from './HTMLAudioElement'
export { default as HTMLVideoElement } from './HTMLVideoElement'
export { default as WebGLRenderingContext } from './WebGLRenderingContext'
export { TouchEvent, PointerEvent, MouseEvent } from './EventIniter/index.js'
export { default as localStorage } from './localStorage'
export { default as location } from './location'
export { btoa, atob } from './Base64.js'
export { default as Symbol } from './Symbol'
export * from './WindowProperties'
export { HTMLCanvasElement }

const { platform } = wx.getSystemInfoSync()

function initCanvas(window) {
    // 暴露全局的 canvas
    module.exports.canvas = window.canvas = createNormalCanvas();
  
    const {windowWidth, windowHeight} = wx.getSystemInfoSync();
  
    canvas.offsetWidth = windowWidth;
    canvas.offsetHeight = windowHeight;
  
    canvas.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
      left: 0,
      right: canvas.offsetWidth,
      top: 0,
      bottom: canvas.offsetHeight
    });

    wx.mainCanvasInited = true;
  
    return canvas;
}

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

function alert(msg) {
    console.log(msg);
}

function focus() {}

function blur() {}

if (platform !== 'devtools') {
    const wxPerf = wx.getPerformance ? wx.getPerformance() : Date;
    const consoleTimers = {};
    console.time = function(name) {
        consoleTimers[name] = wxPerf.now();
    };

    console.timeEnd = function(name) {
        const timeStart = consoleTimers[name];
        if(!timeStart) {
            return;
        }

        const timeElapsed = wxPerf.now() - timeStart;
        console.log(name + ": " + timeElapsed / 1000 + "ms");
        delete consoleTimers[name];
    };
}

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
const _requestAnimationFrame = requestAnimationFrame;
const _cancelAnimationFrame = cancelAnimationFrame;
export {
    initCanvas,
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
    _requestAnimationFrame as requestAnimationFrame,
    _cancelAnimationFrame as cancelAnimationFrame
}
