const express = require("express");
const app = express();
const port = 1000;
const validation = require("./middleware.js");

app.use(express.json());

app.use("/", validation);


app.get("/product", (req, res) => {
  res.end("Welcome to the Product page");
});

app.get("/home", (req, res) => {
  res.end("Welcome to the Home Page");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
