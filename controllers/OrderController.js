const { Order } = require("../models/index.js");

const OrderController = {
  create(req, res) {
    req.body.role = "order";

    Order.create(req.body)

      .then((order) =>
        res.status(201).send({ message: "Orden creada con éxito", order }),
        Order.addOrder(req.body.ProductId)
      )

      .catch(console.error);
  },
};

module.exports = OrderController;
