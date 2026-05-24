const { setHtmlResponse, parseRequestBody } = require("./utils");

const requestHandler = (request, response) => {
  const { method, url } = request;

  const dummyUsers = ["Alice", "Bob", "Charlie"];
  const htmlDummyUsers = `
  <ul>
    ${dummyUsers.reduce((acc, val) => acc + `<li>${val}</li>`, "")}
  </ul>
  `;

  switch (url) {
    case "/":
      setHtmlResponse(
        response,
        "<h1>Welcome to the Home Page</h1><form method='POST' action='/create-user'><input type='text' name='username'><button type='submit'>Send</button></form>",
        "Home Page",
      );
      response.end();
      break;
    case "/users":
      setHtmlResponse(
        response,
        `<h1>Users List</h1>${htmlDummyUsers}`,
        "Users Page",
      );
      response.end();
      break;
    case "/create-user":
      if (method === "POST") {
        parseRequestBody(request).then((username) => {
          console.log("Received username: ", username);
        });
        response.statusCode = 302;
        response.setHeader("Location", "/users");
        response.end();
      } else {
        setHtmlResponse(response, "<h1>Method Not Allowed</h1>", "Error");
        response.statusCode = 405;
        response.end();
      }
      break;
    default:
      setHtmlResponse(response, "<h1>404 Not Found</h1>", "Not Found");
      response.statusCode = 404;
      response.end();
  }
};

module.exports.handler = requestHandler;
