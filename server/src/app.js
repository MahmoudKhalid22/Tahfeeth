const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./db/dbConnection");
const userRouter = require("./router/users");
const tableRouter = require("./router/tables");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(tableRouter);

const port = process.env.PORT;

app.listen(port, () => console.log("Server is running on port " + port));
