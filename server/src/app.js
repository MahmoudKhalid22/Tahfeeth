const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const mongoose = require("./config/dbConnection");
const userRouter = require("./router/user");
const tableRouter = require("./router/tables");
const { docs } = require("./utils/swagger");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(tableRouter);
docs(app);

app.get("*", (req, res) => {
  res.render("404");
});
const port = process.env.PORT;

app.listen(port, () => console.log("Server is running on port " + port));
