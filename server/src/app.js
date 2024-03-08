const express = require("express");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("./config/dbConnection");
require("./controller/OAuth");
const userRouter = require("./router/user");
const tableRouter = require("./router/tables");
const { docs } = require("./utils/swagger");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRouter);
app.use("/table", tableRouter);

docs(app);

const testReq = async () => {
  try {
    const response = await fetch("https://tahfeeth-system.onrender.com/test");
    const result = await response.json();
    // console.log(result);
  } catch (err) {
    console.log("Error fetching data:", err);
  } finally {
    setTimeout(testReq, 500000);
  }
};

testReq();

app.get("/test", (req, res) => res.json({ msg: "test" }));

app.get("*", (req, res) => {
  res.render("404");
});
const port = process.env.PORT;

app.listen(port, () =>
  console.log("Server is running on port http://localhost:" + port)
);
