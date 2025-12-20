const { products } = require("./data");
const express = require("express");
const app = express();

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  if (isNaN(idToFind)) {
    return res.status(404).json({ message: "That product was not found." });
  }

  const product = products.find((p) => p.id === idToFind);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found." });
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, regex, maxPrice } = req.query;
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (regex) {
    const pattern = new RegExp(regex, "i");
    filteredProducts = filteredProducts.filter((product) =>
      pattern.test(product.name)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price < parseFloat(maxPrice)
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }
  res.json(filteredProducts);
});
