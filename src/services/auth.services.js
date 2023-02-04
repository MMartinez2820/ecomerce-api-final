const Users = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart.models");
require("dotenv").config();



class AuthServices {
  static async register(user) {
    try {
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw error;
    };
  };

  static async login(credentials) {
    try {
      const { email, password } = credentials;
      const user = await Users.findOne({ 
        where: { email }, 
        include: {
          model: Cart,
          as: "cart",
          attributes: ["id"]
        }, 
      });

      // console.log(user);
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        if ( isValid ) {

          // return user.isConfirmed ? {isValid: false, message: "confirm account"}  :  { isValid, user };
          return {isValid, user};
        };
        return { isValid, message: "password no coincide" };
      }
      return { isValid: false, message: "user not found" };
    } catch (error) {
      throw error;
    };
  };

  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1d",
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    };
  };


};

module.exports = AuthServices;
