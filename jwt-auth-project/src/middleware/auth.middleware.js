const jwt = require("jsonwebtoken");

const SECRET = "mySecretKey";

module.exports = (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) {

        return res.status(401).json({

            message: "Token Missing"

        });

    }

    const token = header.split(" ")[1];

    try {

        const decoded = jwt.verify(

            token,

            SECRET

        );

        req.user = decoded;

        next();

    }

    catch {

        return res.status(401).json({

            message: "Invalid Token"

        });

    }

};