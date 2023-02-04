const CartServices = require("../services/cart.services");
const ProductsServices = require("../services/products.services");

const addProductToCart = async (req, res) => {
    const body = req.body;
    const {cart} = req.user;
    body.cart_id = cart.id;
    try {
        const product = await ProductsServices.findId(body.product_id);
        if (product) {
            body.price = product.price;
            const result = await CartServices.addProduct(body);
            await CartServices.updatePrice(result.price * result.quantity, cart.id);
            res.status(201).json(result);
        }else{
            res.status(400).json({message:"Product not found"});
        }

    } catch (error) {
       res.status(401).json(error.message);
    }
};

const getProducts = async (req,res) => {
    const {cart} = req.user;
    try {
        const result = await CartServices.getProducts(cart.id);
        if (result) {
            return res.json(result);
        };
        res.status(400).json({message: "no products"})
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteProductToCart = async (req,res) => {
    const {cart } = req.user;
    const {productInCartId} = req.params;
    
    try {
        const productPrice = await CartServices.deleteProduct(cart.id, productInCartId);
        if(productPrice) {
            const result = await CartServices.updatePrice(productPrice, cart.id);
            res.status(200).json({message: "Satisfactorily removed"});
        }else {
            res.status(400).json({message: "Product not found"})
        }
    } catch (error) {
        
    }
    
};

module.exports = {
    addProductToCart,
    getProducts,
    deleteProductToCart,
}