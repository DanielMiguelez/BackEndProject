const { Order } = require("../models/index.js");

/*const OrderController = {
  create(req, res) {
    req.body.role = "order";

    Order.create(req.body)

      .then((order) =>
        res.status(201).send({ message: "Orden creada con éxito", order })
      )

      .catch(console.error);
  },
};*/

const OrderController = {
  async createOrder(req, res){
    try{
    const order = await Order.create (req.body)
    Order.addProduct(req.body.ProductId)
    res.send({msg:"order successful", order})
  } catch (error){
      console.error(error)
      res.status(500).send({msg:"Error in the process", error})
  }
  },
};
module.exports = OrderController;
