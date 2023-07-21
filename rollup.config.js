import resolve from "rollup-plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
    {
        input: "src/index.js",
        output: {
            name: "SSC", 
            file: pkg.iife,
            format: "iife",
        },
        plugins: [
            resolve(),
            commonjs(),
            babel(),
        ],
    },
    {
        input: "src/index.js",
        output: {
            name: "SSC", 
            file: pkg.iifeMin,
            format: "iife",
        },
        plugins: [
            resolve(),
            commonjs(),
            babel(),
            terser(),
        ],
    },
    {
        input: "src/index.js",
        output: [{ file: pkg.module, format: "es" }],
        plugins: [
            //babel(),
        ],
    },
    {
        input: "src/index.js",
        output: [{ file: pkg.main, format: "es" }],
        plugins: [
            babel(),
            terser(),
        ],
    },
];
