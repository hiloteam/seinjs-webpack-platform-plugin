import { btoa } from "../Base64";

export function transformArrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export let isIDE = window.navigator && /AlipayIDE/.test(window.navigator.userAgent);
