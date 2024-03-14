/**
 * @swagger
 *  /table/{id}:
 *      get:
 *          description:
 *              admin and teacher and student can get this information about the student
 *          tags:
 *              - Tables
 *          parameters:
 *              - in: path
 *                name: id
 *                description: user id
 *                example: 123abc
 *              - in: headers
 *                name: Authorization
 *                description: Bearer with access token of user
 *                example: Bearer abcxyz123
 *          responses:
 *              '200':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Table'
 *              '500':
 *                  description: Internal server error
 */
/**
 * @swagger
 *  /table/create-table:
 *      post:
 *          description: teacher add table for the student
 *          tags:
 *              - Tables
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                description: Access token for the teacher to allow to him to add table
 *                example: Bearer abcxyz123
 *          requestBody:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Table'
 *
 *
 *          responses:
 *              '201':
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: {message: Table added successfully}
 *
 *              '500':
 *                  description: Internal server error
 */
/**
 * @swagger
 *  /table/{id}:
 *   patch:
 *      description: update table content
 *      tags:
 *          - Tables
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the updated table
 *          - in: header
 *            name: Authorization
 *            description: access token of the teacher
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Table'
 *      responses:
 *           '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {message: user has been deleted successfully}
 *
 *           '500':
 *                  description: Internal server error
 *
 *
 */
/**
 * @swagger
 *  /table/{id}:
 *   delete:
 *      description: delete table content
 *      tags:
 *          - Tables
 *      parameters:
 *          - in: path
 *            name: id
 *            description: the id of the deleted table
 *          - in: header
 *            name: Authorization
 *            description: access token of the teacher
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {message: user has been deleted successfully}
 *          '500':
 *                  description: Internal server error
 */
