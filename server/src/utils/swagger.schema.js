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

 *          name:
 *            type: string
 *            description: the name of the user
 *          email:
 *            type: string
 *            description: the email of the user
 *          password:
 *             type: string
 *             description: the password of the user
 *          role:
 *              type: string
 *              description: the role of the user
 *          professional: 
 *              type: boolean
 *              description: if the user is a teacher, is he professional or not
 *          price: 
 *              type: number
 *              default: 50
 *              description: if the user is a teacher, how much does he want for a student
 * 
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
 *      Student:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              role:
 *                  type: string
 *              professional:
 *                  type: boolean
 *              id:
 *                  type: string
 * 
 *      Table:
 *          type: object
 *          properties:
 *              day: 
 *                  type: string
 *                  description: the day of the session
 *              quantity:
 *                  type: string
 *                  description: the quantity of the memorization
 *              level:
 *                  type: string
 *                  description: the level of the memorization
 *              tasks:
 *                  type: string
 *                  description: the tasks that the student should do next time
 *              completed:
 *                  type: boolean
 *                  description: the completed status of the previous task
 *              questions:
 *                  type: string
 *                  description: if there any important question
 *              answers:
 *                  type: string
 *                  description: the answer of the question
 *              notes:
 *                  type: string
 *                  description: check if there any notes about this student
 *              rate: 
 *                  type: string
 *                  description: the rate of the student at this session   
 *                  
 *
 */
