
const http = require("node:http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello! My Node.js server is working.");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
