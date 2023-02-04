const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const ProductInCart = db.define("products_in_carts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = ProductInCart;

/**
 * @openapi
 * components:
 *   schemas:
 *     addProduct:
 *       type: object
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 3
 *         quantity:
 *           type: float
 *           example: 10
 */