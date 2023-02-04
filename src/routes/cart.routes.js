const { Router } = require("express");
const { addProductToCart, getProducts, deleteProductToCart } = require("../controllers/cart.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", authMiddleware,addProductToCart);
router.get("/", authMiddleware, getProducts);
router.delete("/:productInCartId", authMiddleware, deleteProductToCart);


module.exports = router;

/**
 * @openapi
 * /cart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the products that the user has
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: Product response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Satisfactory response
 *       400:
 *           description: Error response for database
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is an error in the request
 * paths:
 *   /cart:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Add a product to your shopping cart
 *       tags:
 *         - Cart
 *       requestBody:
 *         description: Fill in all the fields to add a product to the cart
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/addProduct"
 *       responses:
 *         201:
 *           description: Add to cart response successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: successfully created
 *         400:
 *           description: Error response for database
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is an error in the request
 *   /cart/{productInCartId}:
 *     delete:
 *       tags: [Cart]
 *       security:
 *         - bearerAuth: []
 *       summary: delete product in cart
 *       parameters:
 *         - in: path
 *           name: productInCartId
 *           required: true
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         400:
 *           definition: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: There is an error in the request
 */