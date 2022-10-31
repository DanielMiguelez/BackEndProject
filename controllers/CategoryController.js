const { Category } = require("../models/index.js");

const CategoryController = {
  create(req, res) {
    console.log(req.body)
    Category.create(req.body)

      .then((user) =>
        res.status(201).send({ message: "Categoria creada con éxito", Category })
      )

      .catch(console.error);
  },
};



module.exports = CategoryController;