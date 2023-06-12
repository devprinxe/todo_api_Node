import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/register", register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a User
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.post("/logout", logout);

export default router;
