import * as Mixin from './util/mixin'
import HTMLCanvasElement from './HTMLCanvasElement'

// TODO
let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

export default function Canvas() {
    if (!wx.mainCanvasInited) {
        console.warn('You can not use offscreen canvas before main canvas was created !')

        return {
            getContext() {
                return {
                    clearColor(r, g, b, a) {
                        this.rgba = [r * 255, g * 255, b * 255, a * 255];
                    },
                    clear() { },
                    readPixels(x, y, w, h, mode, format, pixels) {
                        pixels[0] = this.rgba[0];
                        pixels[1] = this.rgba[1];
                        pixels[2] = this.rgba[2];
                        pixels[3] = this.rgba[3];
                    }
                }
            },
        }
    }

    return createNormalCanvas();
}

export function createNormalCanvas() {
    const canvas = wx.createCanvas();
    canvas.style = {};

    canvas.focus = function() {};
    canvas.blur = function() {};

    canvas.addEventListener = function(type, listener, options = {}) {
        // console.log('canvas.addEventListener', type);
        document.addEventListener(type, listener, options);
    }

    canvas.removeEventListener = function(type, listener) {
        // console.log('canvas.removeEventListener', type);
        document.removeEventListener(type, listener);
    }

    canvas.dispatchEvent = function(event = {}) {
        console.log('canvas.dispatchEvent', event.type, event);
        // nothing to do
    }

    try {
        if (!('tagName' in canvas)) {
            canvas.tagName = 'CANVAS'
        }

        canvas.__proto__.__proto__ = new HTMLCanvasElement()
    } catch (error) {

    }

    return canvas;
}
