/*
 * @Author: wangzhijian
 * @Date: 2021-05-26 09:27:02
 * @LastEditTime: 2021-05-26 17:25:29
 */
import fs from 'fs';
import http from 'http';
import glob from 'glob';
import path from 'path';

class SourceMapUploadPlugin {
  constructor(options) {
    this.options = options;
  }

  upload(url, file) {
    return new Promise((resolve) => {
      console.log('upload map', file);
      const req = http.request(`${url}?name=${path.basename(file)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          Connection: 'Keep-alive',
          'Transfer-Encoding': 'chunked',
        },
      });
      fs.createReadStream(file)
        .on('data', (chunk) => {
          req.write(chunk);
        })
        .on('end', () => {
          req.end();
          resolve();
        });
    });
  }

  apply(compiler) {
    compiler.hooks.done.tap('source-map-upload-plugin', (status) => {
      console.log('webpack running');
      const list = glob.sync(
        path.join(status.compilation.outputOptions.path, './**/*.{js.map,}')
      );
      for (const filename of list) {
        this.upload(this.options.url, filename);
      }
    });
  }
}

export default SourceMapUploadPlugin;
