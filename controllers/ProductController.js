const { Product } = require("../models/index.js");

const ProductController = {
  create(req, res) {
    req.body.role = "product";

    Product.create(req.body)

      .then((Product) =>
        res.status(201).send({ message: "Producto creado con éxito", Product })
      )

      .catch(console.error);
  },
};

module.exports = ProductController;
