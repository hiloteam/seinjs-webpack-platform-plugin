export { default as navigator } from './navigator'
export { default as XMLHttpRequest } from './XMLHttpRequest'
export { default as WebSocket } from './WebSocket'
export { default as Image } from './Image'
export { default as ImageBitmap } from './ImageBitmap'
export { default as Audio } from './Audio'
export { default as FileReader } from './FileReader'
export { default as Element } from './Element'
export { default as HTMLElement } from './HTMLElement'
export { default as HTMLImageElement } from './HTMLImageElement'
export { default as HTMLCanvasElement } from './HTMLCanvasElement'
export { default as HTMLMediaElement } from './HTMLMediaElement'
export { default as HTMLAudioElement } from './HTMLAudioElement'
import Canvas from './Canvas'

export { default as HTMLVideoElement } from './HTMLVideoElement'
export { default as WebGLRenderingContext } from './WebGLRenderingContext'
export { TouchEvent, MouseEvent } from './EventIniter/index.js'
export { default as localStorage } from './localStorage'
export { btoa, atob } from './Base64'
export * from './WindowProperties'
import location_ from './location'
export const location = location_
export { Canvas };

export function ontouchstart() {}

export function initCanvas(window) {
  // 暴露全局的 canvas
  const canvas = window.canvas = my.createCanvas();
  canvas.style = {};
  canvas.__proto__.__proto__ = new HTMLCanvasElement()
  my.mainCanvasInited = true;

  const {windowWidth, windowHeight, screenWidth, screenHeight} = my.getSystemInfoSync();

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

  return canvas;
}

export function alert(msg) {
    my.alert({
        content: msg
      });
}

export function focus() {}

export function blur() {}