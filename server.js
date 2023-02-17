require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("middleware/error-handler");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A test API",
    },
    basePath: "/",
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: [
    "./swagger/routes/products.js",
    /*"./stores/stores.controller.js",
    "./categories/categories.controller.js",*/
  ],
};
const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/stores", require("./stores/stores.controller"));
app.use("/products", require("./products/products.controller"));
app.use("/categories", require("./categories/categories.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = 3001;
app.listen(port, () => console.log("Server listening on port " + port));
