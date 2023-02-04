const { AccountConfirmationEmail } = require("../middlewares/email.middleware");
const Users = require("../models/users.models");
const AuthServices = require("../services/auth.services");
const CartServices = require("../services/cart.services");
const transporter = require("../utils/mailer");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    
    if (result) {
      await CartServices.create(result.id);
      res.status(201).json({ message: "user created" });
      /*
      await transporter.sendMail({
        to: result.email,
        from: process.env.EMAIL,
        subjetc: "Email confirmation",
        html: "<h1>Bienvenido a la mejor app de chat creada por mi</h1> <p>Tienes que confirmar tu email</p><p> Solo haz click en el siguiente <a href='#'' target='new_blank'> enlace </a>",
      });
      */
      await AccountConfirmationEmail({email: result.email});
    } else {
      res.status(400).json({ message: "somethign wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      });
    }
    const result = await AuthServices.login({ email, password });

    //console.log(result); //field || credentials

    if (result.isValid) {
      const { username, id, email, cart } = result.user;
      const userData = { username, userId:id, email, cart };

      const token = AuthServices.genToken(userData);
      delete userData.cart;
      userData.token = token;
      res.json(userData);
    } else {
      res.status(400).json({ message: result.message });
    }
    // usuario no encontrado
    // contraseña incorrecta
  } catch (error) {
    res.status(400).json({ message: "Something wrong" });
  };
};


module.exports = {
  register,
  login,

};
