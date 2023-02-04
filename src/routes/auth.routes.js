// registro
// login
const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");
const { VerifyVerificationToken } = require("../middlewares/email.middleware");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post('/confirm', VerifyVerificationToken);

module.exports = router; // ahorita lo usamos en app

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Create a new into application
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Require fields to create a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       201:
 *         description: create user
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                    example: user create
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Check the parameters
 * /auth/login:
 *   post:
 *     summary: Login an existing user into the app
 *     tags: [Auth]
 *     requestBody:
 *       description: Require fields to login a existing user
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         definition: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginResponse'
 *       400:
 *         definition: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not found / not password or email provider
 *       401:
 *         definition: unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: unauthorized
 */