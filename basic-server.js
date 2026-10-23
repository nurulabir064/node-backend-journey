
const http = require("node:http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    res.end("Welcome page");
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200);
    res.end("About Page");
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
