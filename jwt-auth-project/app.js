const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./src/routes/auth.routes");

app.use("/auth", authRoutes);

app.listen(3000, () => {

    console.log("Server Running");

});