"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          notNull: {
            msg: "Por favor introduce tu nombre",
          },
        },
      },
      surname: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          notNull: {
            msg: "Please type your name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          notNull: {
            msg: "Please type yuor e-mail",
          },

          isEmail: {
            msg: "It has to be a valid e-mail",
          },
        },
      },
      role: DataTypes.STRING,
      gender: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
