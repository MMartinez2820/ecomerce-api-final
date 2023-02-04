const { Router, application } = require("express");
const { AddProductsToOrder, getProducts } = require("../controllers/order.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get('/', authMiddleware,getProducts)
router.post("/", authMiddleware,AddProductsToOrder);

module.exports = router;

/**
 * @openapi
 * /order:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all order products
 *     description: Token needs to be sent
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: Answer that everything has gone well
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: [{id: 1,total_price: 100000, products: [{id: 1, quantity: 20, price: 50000, product: {id: 3, name: bolso, price: 50000,availableQty: 30}}]}]
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: There is an error, try again
 * paths:
 *   /order:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Move all products to order
 *       description: Token needs to be sent
 *       tags:
 *         - Order
 *       responses:
 *         201:
 *           description: Satisfactory response to have moved the products
 *           content: 
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                      type: string
 *                      example: Products were successfully added
 *         400:
 *           description: validation error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is an error, try again
 */
