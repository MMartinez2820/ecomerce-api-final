const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.models");

const Cart = db.define("carts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
},
{
    timestamps: false,
}

);

module.exports = Cart;