const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("./controller/productController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([a-z A-Z0-9._,-])/) &&
    req.method === "PUT"
  ) {
    let id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([a-z A-Z0-9._,-])/) &&
    req.method === "DELETE"
  ) {
    let id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([a-z A-Z0-9._,-])/) &&
    req.method === "GET"
  ) {
    let id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Rout not found" }));
  }
});

const PORT = process.env.PORT || 3081;

server.listen(PORT, () => console.log(`Server running in port ${PORT}`));
