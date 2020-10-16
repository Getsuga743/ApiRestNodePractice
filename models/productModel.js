let products = require("../data/products.json");
const { writeInFile } = require("../utilities");
const { v4: uuidv4 } = require("uuid");

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeInFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => {
      return p.id === id;
    });
    products[index] = { id, ...product };

    writeInFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((el) => {
      return el.id === id;
    });

    resolve(product);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => {
      return p.id !== id;
    });
    writeInFile("./data/products.json", products);
    console.log(products);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
