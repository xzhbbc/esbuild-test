import { build } from "esbuild";

let testPlugin = {
  name: 'testPlugin',
  setup(build) {
    build.onResolve({ filter: /\.jsx$/ }, args => (
      console.log(args)
    ))
  }
}

const buildCode = async () => {
  const builds = await build({
    entryPoints: ['./code/src/index.jsx'],
    outdir: './dist',
    bundle: true,
    loader: { '.js': 'jsx', '.scss': 'css' },
    external: ['react', 'react-dom'],
    // plugins: [
    //   testPlugin
    // ]
  })
}
buildCode()