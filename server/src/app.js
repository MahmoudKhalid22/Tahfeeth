const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./config/dbConnection");
const userRouter = require("./router/user");
const tableRouter = require("./router/tables");
const { docs } = require("./utils/swagger");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(tableRouter);
docs(app);

const port = process.env.PORT;

app.listen(port, () => console.log("Server is running on port " + port));
