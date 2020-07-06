import * as __window from './window'
import document from './document'

const _window = {...__window};

function inject() {
    _window.document = document;

    _window.addEventListener = (type, listener) => {
        _window.document.addEventListener(type, listener)
    }
    _window.removeEventListener = (type, listener) => {
        _window.document.removeEventListener(type, listener)
    }
    _window.dispatchEvent = function(event = {}) {
        console.log('window.dispatchEvent', event.type, event);
        // nothing to do
    }

    wx.window = _window;
    _window.wx = wx;
}

if (!global.__isAdapterInjected) {
    global.__isAdapterInjected = true
    inject()
}
