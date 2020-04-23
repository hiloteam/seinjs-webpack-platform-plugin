/**
 * @File   : assets.js
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/30/2019, 6:52:49 PM
 * @Description:
 */
import fs from 'fs';
import path from 'path';

import {isDev} from './utils';

export default class Assets {
  constructor(selfPath) {
    this._selfPath = selfPath;
    this._headerCache = {};
    this._adapterCache = {};
  }

  getHeader(platform) {
    let content = this._headerCache[platform];

    if (content && !isDev) {
      return content;
    }

    content = this._headerCache[platform] = this.readFile(`../headers/${platform}.js`);

    return content;
  }

  getAdapter(platform) {
    let content = this._adapterCache[platform];

    if (content && !isDev) {
      return content;
    }

    content = this._adapterCache[platform] = this.readFile(`../adapters/dist/${platform}.js`);

    return content;
  }

  readFile(rPath) {
    const p = path.resolve(this._selfPath, rPath);

    return fs.readFileSync(p, {encoding: 'utf8'});
  }
}
