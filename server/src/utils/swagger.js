// File: swagger.js
const express = require("express");
const expressSwagger = require("express-swagger-generator");
const router = require("../router/users");

const app = express();
const options = {
  definiiton: {
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    host: "localhost:5000", // Change this based on your server configuration
    basePath: "/",
  },
  basedir: __dirname, // App absolute path
  files: ["./router/**/*.js"], // Path to the API handle folder
};

expressSwagger(options)(app);

app.listen(5000, () => console.log("Server is running"));
