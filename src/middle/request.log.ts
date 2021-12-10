export function logger(req, res, next) {
  const { path, params, query, body } = req;
  console.log(`
      接口：${path},
      参数：params ${JSON.stringify(params)},
      参数：query ${JSON.stringify(query)},
      参数：body ${JSON.stringify(body)},
    `);
  next();
}
