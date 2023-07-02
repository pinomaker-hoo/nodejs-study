//@ts-check

/**
 * 블로그 포팅 서비스
 * - 로컬 파일을 DB로 활용
 * - 인증 로직 없음
 * - RESTFUL API
 */

const http = require("http");

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */
const posts = [
  {
    id: "1",
    title: "My First Post",
    content: "Hello World!",
  },
  {
    id: "2",
    title: "My Second Post",
    content: "Hello World!",
  },
];

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_])$/;
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined;
  if (req.url === "/posts" && req.method === "GET") {
    const result = {
      posts: posts.map((item) => ({
        id: item.id,
        title: item.title,
      })),
      totalCount: posts.length,
    };
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json; endcoding=utf-8");
    res.end(JSON.stringify(result));
  } else if (postIdRegexResult && req.method === "GET") {
    const postId = postIdRegexResult[1];
    const post = posts.find((item) => item.id === postId);
    if (post) {
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json; endcoding=utf-8");
      res.end(JSON.stringify(post));
    } else {
      res.statusCode = 404;
      res.end("Not found post");
    }
  } else if (req.url === "/posts" && req.method === "POST") {
    req.setEncoding("utf-8");
    req.on("data", (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */

      /** @type {CreatePostBody} */
      const body = JSON.parse(data);
      posts.push({ ...body, id: body.title.toLowerCase().replace(/\s/g, "") });
      console.log(body);
    });
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
