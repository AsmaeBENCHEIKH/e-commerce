/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * definitions:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of your product
 *         price:
 *           type: string
 *           description: The price of your product
 *         categories:
 *           type: array
 *           description: categories of your product
 *           properties:
 *             id:
 *               type: integer
 *               description: The auto-generated id of the product
 *             name:
 *               type: string
 *               description: name of category
 *             description:
 *               type: string
 *               description: categorie description
 *         description:
 *           type: string
 *           description: The price of your product
 *       example:
 *         id: 1
 *         name: My product
 *         price: 152
 *         description: Magic fruit
 *         categories: []
 * /products:
 *   get:
 *     summary: Lists all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: product object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             product:
 *               type: object
 *               "$ref": "#/definitions/Product"
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       500:
 *         description: Some server error
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       404:
 *         description: The product was not found
 *   put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Product'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
