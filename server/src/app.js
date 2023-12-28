const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./db/dbConnection");
const userRouter = require("./router/users");
const tableRouter = require("./router/tables");
// const { swaggerDocs } = require("./utils/swagger");
const swaggerAutogen = require("swagger-autogen")();
const swaggerUi = require("swagger-ui-express");
const expressSwagger = require("express-swagger-generator");
const { options } = require("./utils/swagger");

const app = express();
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/*.js"]; // Path to your API routes
swaggerAutogen(outputFile, endpointsFiles);

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(tableRouter);
// swaggerDocs(app, 5000);
// Serve Swagger UI
expressSwagger(options, app);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./swagger-output.json"))
);

app.listen(5000, () => console.log("Server is running"));
