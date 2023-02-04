const Cart = require("../models/cart.models");
const Products = require("../models/products.models");
const ProductInCart = require("../models/product_in_cart.models");
const OrderServices = require("./order.services");
require("dotenv").config();

class CartServices {
    static async create (userId) {
        try {
            const result = await Cart.create({user_id:userId}); 
            return result;
        } catch (error) {
            throw error;
        };
    };

    static async addProduct (product) {
        try {
            const result = await ProductInCart.create(product);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async getProducts (id) {

        try {
            const result = await Cart.findByPk(id, {
                attributes: {
                    exclude: ["user_id"]
                },
                include:{
                    model: ProductInCart,
                    as: "products",
                    include:{
                        model: Products,
                        as: "product",
                        where: {
                            status: false
                        },
                        attributes: {
                            exclude: ["user_id","status","createdAt","updatedAt"]
                        }
                    },
                    attributes: {
                        exclude: ["product_id","cart_id","status","createdAt","updatedAt"],
                    },
                    where: {status: false}
                },
            });

            result && result.products.forEach(product => product.product.image_url = process.env.URLIMAGE + product.product.image_url);
            return result;
        } catch (error) {
            throw error;
        };
    };

    static async updatePrice (price, id) {
        try {
            const result = await Cart.increment({total_price: price}, {where: {id}});
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async deleteProduct (cart_id, product_id) {
        try {
            const productfound = await ProductInCart.findByPk(product_id, {
                attributes: ["price", "quantity"],
            });

            if (productfound) {
                await ProductInCart.destroy({where: {id:product_id}});
                return - (productfound.price * productfound.quantity);
            }else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    };

    static async emptyingTheCart(products, cartFound, userId) {
        try {
            const order = await OrderServices.create({total_price: cartFound.total_price, user_id: userId});

            if (order) {
                
                await products.forEach (async product =>{
                    // console.log(product.product);
                    await ProductInCart.update({"status": true}, {where: {id: product.id}});
                    await OrderServices.addProduct({order_id: order.id, product_id: product.product.id, quantity: product.quantity, price: product.price });
                    await Products.increment({availableQty: -product.quantity}, { where: {id: product.product.id}});
                });
                
                const result = await Cart.update({total_price: 0}, {where: {id: cartFound.id}});
                return result;
                
            }else {
                return false;
            }

        } catch (error) {
            throw error;
        }
    };
};

module.exports = CartServices;