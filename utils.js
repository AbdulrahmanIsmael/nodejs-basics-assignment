function setHtmlResponse(
  response,
  content = "<h1>Hello World</h1>",
  title = "My Node.js Assignment",
) {
  response.setHeader("Content-Type", "text/html");
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write(`<title>${title}</title>`);
  response.write("</head>");
  response.write("<body>");
  response.write(
    "<header><nav><a href='/'>Home</a><a href='/users'>Users</a></nav></header>",
  );
  response.write(content);
  response.write("</body>");
  response.write("</html>");
}

function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const params = new URLSearchParams(parsedBody);
      const username = params.get("username");
      resolve(username);
    });

    request.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {
  setHtmlResponse,
  parseRequestBody,
};
