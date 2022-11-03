const { Product , Sequelize} = require("../models/index.js");
const {Op} = Sequelize

const ProductController = {
  create(req, res) {
    req.body.role = "product";

    Product.create(req.body)

      .then((Product) =>
        res.status(201).send({ message: "Producto creado con éxito", Product }),
      )

      .catch(console.error);
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

  getAll(req, res) {
    // Post.findAll({ include: [{ model: User, attributes: ["name"] }] })
    Product.findAll()
      .then((products) => res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send({message: "Hubo un problema al traer los productos con sus categorias"});
      });
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

  //Filtro que ordene los productos de mayor a menor precio

    /*async selectDesc (req, res,) {
    let sql = `SELECT * FROM products ORDER BY price DESC`;
    db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    })
    },*/

  //Implementa validación a la hora de crear un producto para que se rellene todos los campos y si no se hace que devuelva un mensaje
    
  
  //Solo podrás crear, actualizar y eliminar productos si estás autenticado.


  

  
};









module.exports = ProductController;
