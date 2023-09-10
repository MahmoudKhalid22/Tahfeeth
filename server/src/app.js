const express = require("express");
require("dotenv").config();
const mongoose = require("./db/dbConnection");
const userRouter = require("./router/users");

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(5000, () => console.log("Server is running"));
