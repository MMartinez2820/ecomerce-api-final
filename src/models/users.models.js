const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      field: "is_confirmed",
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const { password } = user;
        const hash = bcrypt.hashSync(password, 10);
        user.password = hash;
      },
    },
  },
);

module.exports = Users;

/**
 * @openapi
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: miguel@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: miguel@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 *     loginResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: miguel
 *         userId:
 *           type: INTEGER
 *           example: 1
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
