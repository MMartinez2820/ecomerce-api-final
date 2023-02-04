const Products = require("../models/products.models");
const Users = require("../models/users.models");
require("dotenv").config();


class ProductsServices {
    static async getAll () {
        try {
            const result = await Products.findAll({
                availableQty: { ["Op.gt"]: 0},
                attributes: {
                    exclude: ["status", "createdAt", "updatedAt"],
                },
                include: {
                    model: Users,
                    as: "seller",
                    attributes: ["id", "email", "username"],
                },
            });

            result.forEach(product => product.image_url = process.env.URLIMAGE + product.image_url );
            return result;
        } catch (error) {
            throw error;
        };
    };

    static async create (product) {
        try {
            const result = await Products.create(product);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId (id) {
        try {
            const result = await Products.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };
};


module.exports = ProductsServices;