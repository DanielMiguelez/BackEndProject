const { User, Order,Product,Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "user";
      const password = await bcrypt.hash(
        req.body.password ? req.body.password : "",
        10
      );
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ msg: "user succesfully created", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });

      res.send({ message: "Welcome " + user.name, user, token });
    });
  },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });

      res.send({ message: "Succesfully disconected" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "There was a problem login out" });
    }
  },

  async getUserWithOrderById(req, res) {
    try {
      const users = await User.findByPk(req.user.id,{
        attributes: { exclude: ["password", "role", "createdAt", "updatedAt"] },
        include: [
          {
            model: Order,
            attributes: ["id", "date","status"],
            include: [
              {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        ],
        
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "There was an error getting user", error });
    }
  },
  async getUserWithOrdersById(req, res) {
    try {
      const user = await user.findByPk(req.params.id, {});
      res.send(user);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al crear el producto", err });
    }
  },

};

module.exports = UserController;
