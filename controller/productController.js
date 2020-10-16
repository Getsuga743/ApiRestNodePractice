const Products = require("../models/productModel");

const { getPostData } = require("../utilities");



// Create a new product

// route POST  /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Products.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

// Update a product

// route PUT  /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);
      
      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.id,
        price: price || product.price,
      };

      const updProduct = await Products.update(id, productData);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (err) {
    console.log(err);
  }
}

// Gets all products
//route "GET" /api/products

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.err;
  }
}

// Gets single product
//route "GET" /api/products/:id

async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.err;
  }
}


// delete single product
//route "DELETE" /api/products/:id

async function deleteProduct(req, res, id) {
    try {
      const product = await Products.findById(id);
      if (!product) {
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product Not Found" }));
      } else {
        await Products.remove(id)
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({message: `Product: ${id} removed`}));
      }
    } catch (err) {
      console.log(err);
    }
  }
  

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
