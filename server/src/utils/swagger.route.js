/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     description: new user registretion for this site
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: Mahmoud Khalid
 *             email: user@example.com
 *             password: newPassword123
 *     responses:
 *       '200':
 *         description: user created successfully please check your email for verification
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /user/verify/{token}:
 *   get:
 *     summary: Verification token for verify account
 *     description: Verification token
 *     tags:
 *       - User
 *   parameters:
 *       - in: query
 *         name: verify email
 *         description: Token for verify email
 *         required: true
 *         schema:
 *           type: string
 *   responses:
 *       '200':
 *         description: Account has been verifid, you can login now ☺
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login user to his page
 *     description: login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: user@example.com
 *             password: newPassword123
 *     responses:
 *       '200':
 *         description: after login this response will back to user
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: logout the user from the account
 *     description: logout the user
 *     tags:
 *       - User
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer access token for logout
 *        example: "Bearer abcxyz123456"
 *        required: true
 *        schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: user logged out successfully
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example: {message: you logged out}
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /user/forget-password:
 *   post:
 *     summary: verify email to reset password
 *     description: verify email to get the link of reset password on this email
 *     tags:
 *       - User
 *     requestBody:
 *          required: true
 *          content:
 *           application/json:
 *               schema:
 *                  type: object
 *                  example:
 *                      email: user@example.com
 *     responses:
 *       '200':
 *         description: check email to reset password
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  example:
 *                      {message: check your email to reset your password}
 *       '401':
 *         description: your email is not correct
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/reset-password/{token}:
 *   post:
 *     summary: reset the paswword
 *     description: reset the password of the user account.
 *     tags:
 *       - User
 *     security:
 *       - accessToken: []
 *
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token had been sent in email
 *        example: "abc123!"
 *        required: true
 *        schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *                 {password: mmm123!}
 *     responses:
 *       '200':
 *         description: password has been updated
 *       '401':
 *         description: token has been expired
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/refresh-token:
 *  get:
 *      summary: refresh token after the access token expires
 *      description: this endpoint to get new access token if refresh token has been expired
 *      tags:
 *          - User
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer refresh token for get new access token
 *        example: "Bearer abcxyz123456"
 *        required: true
 *        schema:
 *           type: string
 *      responses:
 *          '200':
 *              desctiption: new access token
 *              content:
 *                  application/json:
 *                      type: object
 *                      example: {accessToken: string}
 */
/**
 * @swagger
 * /update-username:
 *   put:
 *     summary: Update user addresses
 *     description: Update the addresses of the authenticated user.
 *     tags:
 *       - User
 *     security:
 *       - accessToken: []
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer access token for update the username
 *        example: "Bearer abcxyz123456"
 *        required: true
 *        schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *             example:
 *               name:
 *                  "mahmoud khalid"
 *
 *     responses:
 *       '200':
 *         description: username has been updated successfully
 *         content:
 *           application/json:
 *              type: object
 *
 *              schema:
 *                  $ref: '#/components/schemas/Login'
 *
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /update-email:
 *   put:
 *    summary: update email.
 *    tags:
 *        - User
 *    description: if the user wants to update his name from this end point he can do that.
 *    parameters:
 *       - in: header
 *         name: accessToken
 *         description: access token token for update the username
 *         required: true
 *         schema:
 *           type: string
 *    requestBody:
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *    responses:
 *       '200':
 *         description: User has been updated successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /update-password:
 *   put:
 *     summary: Update user password
 *     description: Update user password after authentication using a Bearer token stored in a cookie.
 *     tags:
 *       - User
 *     security:
 *       - accessToken: []
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword: string
 *               newPassword: string
 *           example:
 *             oldPassword: "string"
 *             newPassword: "string"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request
 */
