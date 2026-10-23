
const http = require("node:http");

const products = [
  { id: 1, name: "Keyboard", price: 1200 },
  { id: 2, name: "Mouse", price: 650 },
];

let nextId = 3;

function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
  });

  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  return JSON.parse(body);
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(
    req.url,
    "http://localhost:3003"
  );

  if (pathname === "/products" && req.method === "GET") {
    return send(res, 200, {
      success: true,
      data: products,
    });
  }

  if (pathname === "/products" && req.method === "POST") {
    if (!req.headers["content-type"]?.includes("application/json")) {
      return send(res, 415, {
        success: false,
        message: "Send JSON data.",
      });
    }

    let input;

    try {
      input = await readBody(req);
    } catch {
      return send(res, 400, {
        success: false,
        message: "Invalid JSON.",
      });
    }

    if (
      !input ||
      typeof input.name !== "string" ||
      !input.name.trim() ||
      typeof input.price !== "number" ||
      !Number.isFinite(input.price) ||
      input.price <= 0
    ) {
      return send(res, 400, {
        success: false,
        message: "Valid name and positive price are required.",
      });
    }

    const product = {
      id: nextId++,
      name: input.name.trim(),
      price: input.price,
    };

    products.push(product);

    return send(res, 201, {
      success: true,
      data: product,
    });
  }

  const match = pathname.match(/^\/products\/([^/]+)$/);

  if (match) {
    if (req.method !== "GET") {
      return send(res, 405, {
        success: false,
        message: "Method not allowed.",
      });
    }

    const id = Number(match[1]);

    if (!Number.isInteger(id) || id <= 0) {
      return send(res, 400, {
        success: false,
        message: "Invalid product ID.",
      });
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
      return send(res, 404, {
        success: false,
        message: "Product not found.",
      });
    }

    return send(res, 200, {
      success: true,
      data: product,
    });
  }

  return send(res, 404, {
    success: false,
    message: "Route not found.",
  });
});

server.listen(3003, () => {
  console.log("Server running at http://localhost:3003");
});
