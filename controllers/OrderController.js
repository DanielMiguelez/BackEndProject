const { Order, Product } = require("../models/index.js");

const OrderController = {
  async createOrder(req, res){
    try{
    const order = await Order.create ({...req.body,date: new Date(),
      status: "in process",UserId:req.user.id})
    order.addProduct(req.body.ProductId)
    res.send({msg:"order successful", order})
  } catch (error){
      console.error(error)
      res.status(500).send({msg:"No me has creado la orden socio...", error})
  }
  },


async getOrdersAndProducts(req, res) {
  try {
    const categories = await Order.findAll({
      include: [{ model: Product, attributes: ["name","price"], through: { attributes: [] } }],
    });
    res.send({ msg: "Your Categories and products", categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error while getting Categories with products", error });
  }}

};
module.exports = OrderController;
