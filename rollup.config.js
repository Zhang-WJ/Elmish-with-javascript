import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
const env = process.env.NODE_ENV

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },

    plugins: [
        json(),
        resolve(),
        babel({
            exclude: 'node_modules/**' // only compile ourselves code
        }),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        terser(),
    ]
}