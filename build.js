import { build } from "esbuild";
import { transformSync } from '@swc/core'
import ImportReplace from './plugin/import.plugin.js'
import pkg from 'fs-extra';
const { readFileSync, copyFileSync } = pkg;

let testPlugin = {
  name: 'testPlugin',
  setup(build) {
    build.onLoad({ filter: /\.jsx$/ }, args => {
      const source = readFileSync(args.path, {
        encoding: 'utf-8'
      })
      const output = transformSync(source, {
        jsc: {
          parser: {
            syntax: "ecmascript",
            "jsx": true
          },
          transform: {},
        },
        module: {
          type: 'es6'
        },
        minify: false,
        plugin: (m) => {
          return new ImportReplace().visitModule(m)
        }
      })
      console.log(args)
      console.log(output)
      return {
        contents: output.code,
        loader: 'js'
      }
    })
  }
}

const buildCode = async () => {
  const builds = await build({
    entryPoints: ['./code/src/index.jsx'],
    outdir: './dist',
    bundle: true,
    loader: { '.js': 'jsx', '.scss': 'css' },
    external: ['react', 'react-dom'],
    plugins: [
      testPlugin
    ]
  })
  copyFileSync('./index.html', './dist/index.html')
}
buildCode()