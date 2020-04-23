/**
 * @File   : Worker.js
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 8/8/2019, 12:58:16 PM
 * @Description:
 */
export default class Worker {
  static _worker = null;

  _worker = null
  _onmessage = null
  _events = {
    message: []
  }

  constructor(path) {
    if (Worker._worker) {
      // only one is allowed
      Worker._worker.terminate();
    }

    Worker._worker = this._worker = my.createWorker(path);
    this._worker.onMessage(this.handleMessage);
  }

  terminate() {
    this._worker.terminate();
  }

  postMessage(...args) {
    this._worker.postMessage(...args);
  }

  addEventListener(type, cb) {
    if (!this._events[type]) {
      return;
    }

    const index = this._events[type].indexOf(cb);
    if (index >= 0) {
      return;
    }

    this._events[type].push(cb);
  }

  removeEventListener(type, cb) {
    if (!this._events[type]) {
      return;
    }

    const index = this._events[type].indexOf(cb);
    if (index >= 0) {
      return;
    }

    this._events[type].splice(index, 1);
  }

  handleMessage = (data) => {
    data.data = data;

    if (typeof this._onmessage === 'function') {
      this._onmessage.call(this, data);
    }

    _messageEvent.forEach(cb => cb.call(this, data));
  }
}

