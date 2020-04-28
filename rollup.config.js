import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

export default {
  input: 'index.js',
  output: {
    file: pkg.main,
    format: 'cjs'
  },
  plugins: [
    babel(),
    uglify(),
    preserveShebangs()
  ]
}
