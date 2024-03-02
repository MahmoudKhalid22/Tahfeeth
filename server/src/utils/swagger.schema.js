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
 *      Login:
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
 *          role:
 *             type: string
 *             description: the role either teacher or student
 *          price:
 *              type: number
 *              default: 50
 *              description: the price of the teacher if the role is teacher
 *          accessToken:
 *              type: string
 *              description: the token the user can do anything he allowed to do
 *          refreshToken:
 *              type: string
 *              description: the token to refresh access token if it has been expired
 *
 *      Teachers:
 *         type: object
 *         properties:
 *          _id:
 *              type: string
 *              description: the unique identifier of the teacher
 *          name:
 *              type: string
 *              description: the name of the teacher
 *          email:
 *              type: string
 *              description: the email of the teacher
 *          role:
 *              type: string
 *              description: the role of the teacher which is teacher
 *          professional:
 *              type: boolean
 *              description: is teacher is professional or not
 *          price:
 *              type: number
 *              default: 50
 *              description: the price of the teacher
 *      Message:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user
 *              msg:
 *                  type: string
 *                  description: the message of the user
 */
