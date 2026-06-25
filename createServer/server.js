const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to My First Node App!");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});