
const http = require("node:http");

const products = [
  { id: 1, name: "Keyboard", price: 1200 },
  { id: 2, name: "Mouse", price: 650 },
];

const send = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost:3003").pathname;

  // Create a product
  if (req.method === "POST" && pathname === "/products") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let input;

      try {
        input = JSON.parse(body);
      } catch {
        return send(res, 400, { message: "Invalid JSON body" });
      }

      if (
        !input ||
        typeof input !== "object" ||
        Array.isArray(input)
      ) {
        return send(res, 400, { message: "Invalid request body" });
      }

      const { name, price } = input;

      if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        return send(res, 400, { message: "Invalid product data" });
      }

      const id = Math.max(0, ...products.map((product) => product.id)) + 1;

      const newProduct = {
        id,
        name: name.trim(),
        price,
      };

      products.push(newProduct);

      return send(res, 201, {
        message: "Product created",
        data: newProduct,
      });
    });

    return;
  }

  // Get all products
  if (req.method === "GET" && pathname === "/products") {
    return send(res, 200, { data: products });
  }

  // Delete a product
  if (req.method === "DELETE" && pathname.startsWith("/products/")) {
    const id = Number(pathname.split("/")[2]);

    if (!Number.isInteger(id) || id <= 0) {
      return send(res, 400, { message: "Invalid product ID" });
    }

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return send(res, 404, { message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1)[0];

    return send(res, 200, {
      message: "Product deleted",
      data: deletedProduct,
    });
  }

  // Get one product
  if (req.method === "GET" && pathname.startsWith("/products/")) {
    const id = Number(pathname.split("/")[2]);

    if (!Number.isInteger(id) || id <= 0) {
      return send(res, 400, { message: "Invalid product ID" });
    }

    const product = products.find((product) => product.id === id);

    if (!product) {
      return send(res, 404, { message: "Product not found" });
    }

    return send(res, 200, { data: product });
  }

  return send(res, 404, { message: "Route not found" });
});

server.listen(3003, () => {
  console.log("Server running at http://localhost:3003");
});
