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
 *          accessToken:
 *              type: string
 *              description: the token the user can do anything he allowed to do
 *          refreshToken:
 *              type: string
 *              description: the token to refresh access token if it has been expired
 */
