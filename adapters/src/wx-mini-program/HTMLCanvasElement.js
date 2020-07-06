export default function HTMLCanvasElement() {
  if (!wx.window.mainCanvas) {
    console.warn('You can not use offscreen canvas before main canvas was created !')

    return {
      getContext() {
        return {
          clearColor(r, g, b, a) {
            this.rgba = [r * 255, g * 255, b * 255, a * 255];
          },
          clear() {},
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

  const element = wx.createOffscreenCanvas()
  element.__proto__.__proto__ = HTMLCanvasElement.prototype

  return element
}
