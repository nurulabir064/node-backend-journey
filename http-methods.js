
const http = require("node:http");

const products = [
  { id: 1, name: "Keyboard", price: 1200 }
];

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "GET" && pathname === "/products") {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: products
    }));
    return;   
  }

  if (req.method === "POST" && pathname === "/products") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let product;

      try {
        product = JSON.parse(body);
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: "Invalid JSON. Please send valid JSON data."
        }));
        return;
      }

      if (
        !product ||
        typeof product !== "object" ||
        Array.isArray(product)
      ) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: "Product data must be a JSON object."
        }));
        return;
      }

      if (
        typeof product.name !== "string" ||
        product.name.trim() === ""
      ) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: "Product name is required. Please enter a name."
        }));
        return;
      }

      if (
        typeof product.price !== "number" ||
        !Number.isFinite(product.price)
      ) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: "Price must be a valid number."
        }));
        return;
      }

      if (product.price <= 0) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: "Price must be greater than 0."
        }));
        return;
      }

      const newProduct = {
        id: products.length + 1,
        name: product.name.trim(),
        price: product.price
      };

      products.push(newProduct);

      res.writeHead(201);
      res.end(JSON.stringify({
        success: true,
        message: "Product created successfully.",
        data: newProduct
      }));
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    message: "Route not found. Please check the URL."
  }));
});

server.listen(3002, () => {
  console.log("Server running at http://localhost:3002");
});
