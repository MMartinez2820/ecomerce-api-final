const Cart = require("./cart.models");
const Order = require("./order.models");
const Products = require("./products.models");
const ProductInCart = require("./product_in_cart.models");
const ProductInOrder = require("./product_in_order.models");
const Users = require("./users.models");

const initModels = () => {
  // Users;
  Users.hasOne(Cart, {as: "cart", foreignKey: "user_id"});
  Cart.belongsTo(Users, {as:"user", foreignKey: "user_id"});

  Users.hasMany(Order, {as: "orders", foreignKey: "user_id"});
  Order.belongsTo(Users, {as: "user", foreignKey: "user_id"});

  Users.hasMany(Products, {as:"products", foreignKey:"user_id"});
  Products.belongsTo(Users, {as:"seller", foreignKey:"user_id"});

  Cart.hasMany(ProductInCart, {as: "products", foreignKey: "cart_id"});
  ProductInCart.belongsTo(Cart, {as: "cart", foreignKey: "cart_id"});
  Products.hasMany(ProductInCart, {as: "carts", foreignKey: "product_id"});
  ProductInCart.belongsTo(Products, {as: "product", foreignKey: "product_id"});


  Order.hasMany(ProductInOrder, {as: "products", foreignKey: "order_id"});
  ProductInOrder.belongsTo(Order, {as: "order", foreignKey: "order_id"});
  Products.hasMany(ProductInOrder, {as: "orders", foreignKey: "product_id"});
  ProductInOrder.belongsTo(Products, {as: "product", foreignKey: "product_id"});
  
};

module.exports = initModels;
