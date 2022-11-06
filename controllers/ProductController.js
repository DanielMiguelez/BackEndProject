const { Product, Category, Sequelize} = require("../models/index.js");
const {Op} = Sequelize
const ProductController = {

  async getProducts(req, res) {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          { model: Category, attributes: ["name"] },
         
        ],
      });
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "There was an error getting the products", error });
    }
  },
  
  create(req, res) {
    req.body.role = "product";

    Product.create(req.body, next)

      .then((Product) =>
        res.status(201).send({ message: "Producto creado con éxito", Product })
      )

      .catch(console.error);
      next(error)
  },

  getAll(req, res) {
    Post.findAll({ include: [{ model: Category, attributes: [] }] })
    Product.findAll()
      .then((products) => res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send({message: "Hubo un problema al traer los productos con sus categorias"});
      });
  },

  async updateProductById(req, res) {
    try {
      await Product.update({name:req.body.name,price:req.body.price,description:req.body.description}, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Producto actualizado con éxito" });
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al actualizar el producto", Product });
    }
  },
  async destroyProductById(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Producto destruido con éxito" });
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al destruir el producto", err });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
      });
      res.send(product);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al crear la publicación", err });
    }
  },
  
  async getOneProductByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Hubo un error al buscar el producto", err });
    }
  },

  async getProductByPrice(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          price: req.params.price,
          },
        
      });
      res.send(product);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al buscar por precio", err });
    }
  },

  ProductsOrderDesc(req, res) {
    Product.findAll({ order: [["price", "DESC"]] })
      .then((products) => res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send({message: "Hubo un problema al traer los productos en orden descendente"});
      });
  },

  
};










module.exports = ProductController;
