import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const commonPlugins = [
  resolve(),
  babel({
    babelrc: false,
    include: [path.resolve(__dirname, './src/**/*.js')],
    presets: [
      [
        'env', {
          modules: false,
        },
      ],
      'stage-0',
    ],
    plugins: [
      ['transform-runtime', {
        'helpers': false,
        'regenerator': true,
      }],
      'external-helpers',
    ],
    runtimeHelpers: true,
    comments: false,
  }),
  commonjs(),
  cleanup(),
];

const minifyPlugins = commonPlugins.slice();
minifyPlugins.push(terser())

export default [
  {name: 'my-tiny-program'},
  {name: 'my-tiny-game'}
].map(({name}) => ({
  input: path.resolve(__dirname, `./src/${name}/index.js`),

  output: [
    {
      file: path.resolve(__dirname, `./dist/${name}.js`),
      format: 'esm'
    }
  ],

	plugins: isProd ? minifyPlugins : commonPlugins
}))
