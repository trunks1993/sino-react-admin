import { Compiler } from "webpack";

export default class RouterPlugin {
  constructor() {

  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap('generate-ssr-client-manifest', compilation => {
      // console.log('compilation', compilation);
      const { chunkGroups, compiler: {
        options: {
          output: {
            path: outputPath
          }
        }
      } } = compilation;

      console.log('options', chunkGroups);

    });
  }
}