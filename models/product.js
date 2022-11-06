'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);
    }
  }
  Product.init({
    name: {

      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
      
      notNull: {
      
      msg: "Por favor introduce el nombre del producto",
      
      },
      
      },
      
      },
    price: {

      type: DataTypes.FLOAT,
      
      allowNull: false,
      
      validate: {
      
      notNull: {
      
      msg: "Por favor introduce el precio del producto",
      
      },
      
      },
      
      },
      description: {

        type: DataTypes.STRING,
        
        allowNull: false,
        
        validate: {
        
        notNull: {
        
        msg: "Por favor introduce una descripción para el producto",
        
        },
        
        },
        
        },
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};