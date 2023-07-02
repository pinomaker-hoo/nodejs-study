//@ts-check

/**
 * 블로그 포팅 서비스
 * - 로컬 파일을 DB로 활용
 * - 인증 로직 없음
 * - RESTFUL API
 */

const http = require("http");
const { routes } = require("./api");

const server = http.createServer((req, res) => {
  const main = async () => {
    const route = routes.find(
      (item) => req.url && item.url.test(req.url) && item.method === req.method
    );

    if (!req.url || !route) {
      res.statusCode = 404;
      res.end("Not Found");

      return;
    }

    const regexResult = route.url.exec(req.url);

    if (!regexResult) {
      res.statusCode = 404;
      res.end("Not Found");

      return;
    }

    /** @type {Object.<string, *> | undefined} */
    const reqBody =
      (req.headers["content-type"] === "application/json" &&
        (await new Promise((resolve, reject) => {
          req.setEncoding("utf-8"),
            req.on("data", (data) => {
              try {
                resolve(JSON.parse(data));
              } catch (err) {
                reject(new Error("Format Error"));
              }
            });
        }))) ||
      undefined;

    const { statusCode, body } = await route.callback(regexResult, reqBody);
    res.statusCode = statusCode;
    if (typeof body === "string") {
      res.end(body);
    } else {
      res.setHeader("Content-type", "application/json; charset = utf8");
      res.end(JSON.stringify(body));
    }
  };

  main();
});

const port = 4000;

server.listen(port, () => {
  console.log(`SERVER ON ${port}`);
});
