const fs = require('fs');
const $path = require('path');

export function logger(req, res, next) {
  const { path, params, query, body } = req;
  const filename = new Date().toLocaleDateString().replace(/\//g, '-');
  const logPath = $path.resolve(__dirname + '/../logs/' + filename + '.txt');
  const content = `
接口：${path},
参数：params ${JSON.stringify(params)},
参数：query ${JSON.stringify(query)},
参数：body ${JSON.stringify(body)},
    \n`;

  fs.readFile(logPath, (err, data) => {
    if (err) {
      fs.writeFile(logPath, content, (err, data) => {
        if (err) {
          console.log(err, '创建文件夹失败');
        }
      });
    } else {
      fs.appendFileSync(logPath, content);
    }
  });

  console.log();
  next();
}
