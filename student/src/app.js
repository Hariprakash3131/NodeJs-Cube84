const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("./routes/student.routes");

app.use("/students", studentRoutes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});