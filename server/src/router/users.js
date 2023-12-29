/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: the name of the user
 *          email:
 *            type: string
 *            description: the email of the user
 *          password:
 *             type: string
 *             description: the password of the user
 */
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The user managing api
 * /users/:id:
 *  get:
 *    summary: Lists all the users
 *    tags: [users]
 *    responses:
 *      200:
 *        description: The list of the users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User/required'
 * /users/login:
 *    post:
 *     summary: Login
 *     tags: [Login]
 *     requestBody:
 *      reauired: true
 *      content:
 *       application/json:
 *          schema:
 *
 *
 *     responses:
 *       200:
 *         description: Login for admin and students
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              $ref: "#/components/schemas/User"
 *
 */
const router = require("express").Router();
const {
  getUsers,
  addUser,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  getOneUser,
  newUser,
} = require("../controller/users");

const auth = require("../middleware/auth");

// CREATE A NEW USER
router.post("/users/signup", newUser);

// LOGIN
router.post("/users/login", loginUser);

// LOGOUT
router.post("/users/logout", auth, logoutUser);

router.get("/users", auth, getUsers);

// GET ONE USER

// FOR ADMIN
router.get("/users/:id", getOneUser);

router.post("/users", auth, addUser);
router.delete("/users/:id", auth, deleteUser);

// FOR ADMIN AND USERS
router.patch("/users/:id", auth, updateUser);

// READ SPECIFIC USER
router.get("/users/me", auth, getUser);

module.exports = router;
