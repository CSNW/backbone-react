import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const banner = `//! ${pkg.name} v${pkg.version} - ${pkg.homepage} - @license: ${
  pkg.license
}`;

const external = ['react', 'react-dom', 'backbone'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  backbone: 'Backbone'
};
const es5 = {
  target: 'es5',
  lib: ['dom', 'es5']
};

export default [
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/backbone-react.es.js',
      format: 'es',
      sourcemap: true,
      banner
    },
    plugins: [typescript(), filesize()]
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/backbone-react.umd.js',
      format: 'umd',
      name: 'BackboneReact',
      sourcemap: true,
      globals,
      banner
    },
    plugins: [typescript(es5), filesize()]
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/backbone-react.umd.min.js',
      format: 'umd',
      name: 'BackboneReact',
      sourcemap: true,
      globals,
      banner
    },
    plugins: [typescript(es5), terser(), filesize()]
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/backbone-react.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
