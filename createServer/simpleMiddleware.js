const express = require('express');
const app = express();

function logger(req, res, next) {
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);
    next(); // important
}

app.use(logger);

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(3000, () => {
    console.log("Server running");
});