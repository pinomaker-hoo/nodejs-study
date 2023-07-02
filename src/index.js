//@ts-check

/**
 * 블로그 포팅 서비스
 * - 로컬 파일을 DB로 활용
 * - 인증 로직 없음
 * - RESTFUL API
 */

const http = require("http");

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  if (req.url === "/posts" && req.method === "GET") {
    res.statusCode = 200;
    res.end("List of posts");
  } else if (
    req.url &&
    /^\/posts\/[a-zA-Z0-9-_]$/.test(req.url) &&
    req.method === "GET"
  ) {
    res.statusCode = 200;
    res.end("Some content of post");
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200;
    res.end("Creating post");
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

const port = 4000;

server.listen(port, () => {
  console.log(`SERVER ON ${port}`);
});
