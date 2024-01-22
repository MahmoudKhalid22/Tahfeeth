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
