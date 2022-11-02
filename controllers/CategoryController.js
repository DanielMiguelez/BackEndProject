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
  async updateCategory(req, res) {
    try {
      await Category.update({name:req.body.name}, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Categoria actualizada con éxito" });
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al actualizar la categoria", Category });
    }
  },

  async deleteCategory(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Categoria explotada con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ups, hubo un error al reventar la categoria", Category });
    }
  },


};



module.exports = CategoryController;