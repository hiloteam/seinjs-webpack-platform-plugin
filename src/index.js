/**
 * @File   : index.js
 * @Author : dtysky (shunguang.dty@alibaba-inc.com)
 * @Date   : 7/30/2019, 3:32:13 PM
 * @Description:
 */
import * as path from 'path';
import {ConcatSource, RawSource} from 'webpack-sources';

import Assets from './assets';
import {isDev} from './utils';

const ADAPTER_NAME = 'seinjs-adapter.js';
const NEED_ADD_ADAPTER_REQUIRE = [
  'my-tiny-program'
];

export default class SeinJSPlatformPlugin {
  /**
   * @param {my-tiny-program|my-tiny-game} options.platform
   */
  constructor(options) {
    this._platform = options.platform;
    this._selfPath = __dirname;
    this._assets = new Assets(this._selfPath);
  }

  apply(compiler) {
    const resolve = compiler.options.resolve = compiler.options.resolve || {};
    const alias = resolve.alias = resolve.alias || {};
    alias['seinjs-orig'] = require.resolve('seinjs');
    alias.seinjs = path.resolve(this._selfPath, `../alias/${this._platform}.js`);

    compiler.hooks.emit.tap('SeinJSPlatformPlugin', (compilation, callback) => {
      if (!compilation.assets[ADAPTER_NAME] || isDev) {
        compilation.assets[ADAPTER_NAME] = new RawSource(this._assets.getAdapter(this._platform));
      }

      Object.keys(compilation.assets).forEach(name => {
        if (name === ADAPTER_NAME) {
          return;
        }

        if (path.extname(name) !== '.js') {
          return;
        }

        if (NEED_ADD_ADAPTER_REQUIRE.indexOf(this._platform) >= 0) {
          const content = compilation.assets[name].source();
          compilation.assets[name] = new ConcatSource(
            `require('./${path.relative(path.dirname(name), ADAPTER_NAME)}');\n${this._assets.getHeader(this._platform)}`,
            content
          );
        }
      });
    });
  }
}
