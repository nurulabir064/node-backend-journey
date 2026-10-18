const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/products") {
    res.statusCode = 200;
    res.end("Products Page");
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});