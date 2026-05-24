const http = require("http");

const { handler } = require("./routes");

// creating the server
const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
