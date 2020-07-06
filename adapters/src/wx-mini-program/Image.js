export default function Image() {
  if (!wx.window.mainCanvas) {
    console.warn('You can not use image before main canvas was created !')
    return {};
  }

  const image = wx.window.mainCanvas.createImage();

  // image.__proto__.__proto__ = Image.prototype;

  // image.onload = () => {
  //   image.dispatchEvent({
  //     type: "load",
  //   });
  // }

  // image.onerror = () => {
  //   image.dispatchEvent({
  //     type: "error"
  //   });
  // }

  return image;
}
