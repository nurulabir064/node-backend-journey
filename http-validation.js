
const http = require("node:http");

const products = [
  { id: 1, name: "Keyboard", price: 1200 },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader("Content-Type", "application/json");

  if (method === "GET" && url === "/products") {
    return res.writeHead(200).end(
      JSON.stringify({
        success: true,
        data: products,
      })
    );
  }

  if (method === "POST" && url === "/products") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let product;

      try {
        product = JSON.parse(body);
      } catch {
        return res.writeHead(400).end(
          JSON.stringify({
            success: false,
            message: "Invalid JSON. Please send valid JSON data.",
          })
        );
      }

      if (
        typeof product !== "object" ||
        product === null ||
        Array.isArray(product)
      ) {
        return res.writeHead(400).end(
          JSON.stringify({
            success: false,
            message: "Product data must be a JSON object.",
          })
        );
      }

      if (
        typeof product.name !== "string" ||
        product.name.trim() === ""
      ) {
        return res.writeHead(400).end(
          JSON.stringify({
            success: false,
            message: "Product name is required. Please enter a name.",
          })
        );
      }

      if (
        typeof product.price !== "number" ||
        !Number.isFinite(product.price)
      ) {
        return res.writeHead(400).end(
          JSON.stringify({
            success: false,
            message: "Price must be a valid number.",
          })
        );
      }

      if (product.price <= 0) {
        return res.writeHead(400).end(
          JSON.stringify({
            success: false,
            message: "Price must be greater than 0.",
          })
        );
      }

      const newProduct = {
        id: products.length + 1,
        name: product.name.trim(),
        price: product.price,
      };

      products.push(newProduct);

      return res.writeHead(201).end(
        JSON.stringify({
          success: true,
          message: "Product created successfully.",
          data: newProduct,
        })
      );
    });

    return;
  }

  return res.writeHead(404).end(
    JSON.stringify({
      success: false,
      message: "Route not found. Please check the URL.",
    })
  );
});

server.listen(3002, () => {
  console.log("Server running at http://localhost:3002");
});
