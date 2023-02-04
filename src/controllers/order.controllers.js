const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");

const getProducts = async (req, res) => {
    const {userId} = req.user;
    try {
        const result = await OrderServices.getProducts(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json(error.message);
    };
};

const AddProductsToOrder = async (req, res) => {
    const {userId, cart} = req.user;
    try {
        const cartFound = await CartServices.getProducts(cart.id);
        
        if ( cartFound ) {

            const cartResult = await CartServices.emptyingTheCart(cartFound.products, cartFound, userId);
            
            cartResult != false ?
                res.json({message: "Successfully added"}):
                res.status(400).json({message: "Server error"});
            
        }else {
            res.status(400).json({message: "No products"});
        }
        
    } catch (error) {
        res.status(401).json(error);
    }
}; 

module.exports = {
    AddProductsToOrder,
    getProducts
}