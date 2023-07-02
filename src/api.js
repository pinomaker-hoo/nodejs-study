// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {"GET" | "POST"} method
 * @property {(arr : string[], body : Object | undefined) => Promise<*>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: "GET",
    callback: async () => ({
      statusCode: 200,
      body: posts,
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_])$/,
    method: "GET",
    callback: async (arr) => {
      const postId = arr[1];
      if (!postId) {
        return {
          statusCode: 404,
          body: "Not Found",
        };
      }

      const post = posts.find((item) => item.id === postId);
      if (!post) {
        return {
          statusCode: 404,
          body: "Not Found",
        };
      }

      return {
        statusCode: 200,
        body: post,
      };
    },
  },
  {
    url: /^\/posts$/,
    method: "POST",
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: "Not Found Body",
        };
      }

      // @ts-ignore
      const title = body.title;
      // @ts-ignore
      posts.push({ ...body, id: title });
      return {
        statusCode: 200,
        body: "Creating Post",
      };
    },
  },
];
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

module.exports = {
  routes,
};
