/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update user data [email - password]
 *     description: Updated user data after Authentication
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
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
 *         description: User updated successfully
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /enable2fa-Request:
 *   post:
 *     summary: Request to enable Two-Factor Authentication (2FA)
 *     description: Request to enable 2FA for a user account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 2FA request sent successfully
 *       '400':
 *         description: Bad request
 */

/**
  * @swagger
 * /verify-2FA:
 *   post:
 *     summary: Verify Two-Factor Authentication (2FA)
 *     description: Verify Two-Factor Authentication (2FA) using a token
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: enable2FAToken
 *         description: Token for enabling 2FA
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 2FA enabled successfully
 *       '500':
 *         description: Internal Server Error
 */
*       '500':
*         description: Internal Server Error
*/
/**
* @swagger
* /update-email:
*   put:
*     summary: Update user email address
*     description: Update the email address of the authenticated user.
*     tags:
*       - User
*     security:
*       - accessToken: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userId:
*                 type: string
*               password:
*                 type: string
*               newEmail:
*                 type: string
*     responses:
*       '200':
*         description: Email updated successfully
*       '401':
*         description: Unauthorized - Token is missing or invalid
*       '500':
*         description: Internal Server Error
*/
/**
* @swagger
* /update-addresses:
*   put:
*     summary: Update user addresses
*     description: Update the addresses of the authenticated user.
*     tags:
*       - User
*     security:
*       - accessToken: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               addresses:
*                 type: object
*                 properties:
*                   street:
*                     type: string
*                   city:
*                     type: string
*                   zipCode:
*                     type: number
*             example:
*               addresses:
*                 street: "123 Main St"
*                 city: "Cityville"
*                 zipCode: 12345
*     responses:
*       '200':
*         description: Addresses updated successfully
*       '401':
*         description: Unauthorized - Token is missing or invalid
*       '500':
*         description: Internal Server Error
*/
/**
* @swagger
* /update-username:
*   patch:
*    summary: update user name.
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