const ProductsServices = require("../services/products.services");

const getAllProducts = async (req, res) => {
    try {
        const result = await ProductsServices.getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const createProduct = async (req, res, next) => {
    const body = req.body;
    const file = req.file;
    const { userId } = req.user;
    // console.log(userId)

    body.image_url = file.filename;
    body.user_id = userId;
    
    try {
        const result = await ProductsServices.create(body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    };
    
};

module.exports = {
    getAllProducts,
    createProduct,
}