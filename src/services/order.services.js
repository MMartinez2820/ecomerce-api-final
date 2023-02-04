const Order = require("../models/order.models");
const Products = require("../models/products.models");
const ProductInOrder = require("../models/product_in_order.models");
const Users = require("../models/users.models");
require("dotenv").config();

class OrderServices {

    static async getProducts(userId) {
        try {
            const result = await Users.findByPk(userId, {
                attributes: ["id"],
                include: {
                    model: Order,
                    as: "orders",
                    include:{
                        model: ProductInOrder,
                        as: "products",
                        include: {
                            model: Products,
                            as: "product",
                            attributes: {
                                exclude: ["status","createdAt","updatedAt"]
                            }
                        },
                        attributes: {
                            exclude: ["status","createdAt","updatedAt","order_id","product_id"],
                        }
                    },
                    attributes: {
                        exclude: ["status","user_id"]
                    }
                }
            });
            result && result.orders.forEach(product => product.products.forEach(product2 => product2.product.image_url = process.env.URLIMAGE + product2.product.image_url));
            // if (result) {
            //     for (let i = 0; i < result.orders?.length(); i++) {
            //         for (let o = 0; o < result.orders[i].products?.length(); o++) {
            //             result.orders[i].products[o].product.image_url =  process.env.URLIMAGE + result.orders[i].products[o].product.image_url;

            //             console.log(result.orders[i].products[o].product.image_url =  process.env.URLIMAGE + result.orders[i].products[o].product.image_url);
            //         };
            //     };
            //     return result;
            // }

            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(body) {
        try {
            const result = await Order.create(body);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async addProduct (body) {
        try {
            const result = await ProductInOrder.create(body);
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = OrderServices