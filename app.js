const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./Router/userRouter");

// Initialise app
const app = express();
app.use(express.static("./uploads"));
// Initialise mongoose DB
mongoose.connect(
  "mongodb+srv://tegu576:62954747@cluster0-8doua.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;
// Other dependencies setup
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);
//Handelgin Routs
app.post("/auth", (req, res) => {});
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port number: ${port}`);
});
