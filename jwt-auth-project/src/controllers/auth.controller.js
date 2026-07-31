const db = require("../config/db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const SECRET = "mySecretKey";

exports.register = async (req, res) => {

    const {

        name,

        email,

        password,

        role

    } = req.body;

    db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async (err, result) => {

            if (result.length > 0) {

                return res.json({

                    message: "Email Already Exists"

                });

            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(

                "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",

                [

                    name,

                    email,

                    hashedPassword,

                    role

                ],

                (err) => {

                    if (err) {

                        return res.json(err);

                    }

                    res.json({

                        message: "User Registered"

                    });

                }

            );

        }

    );

};

exports.login = (req, res) => {

    const {

        email,

        password

    } = req.body;

    db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async (err, result) => {

            if (result.length == 0) {

                return res.json({

                    message: "User Not Found"

                });

            }

            const user = result[0];

            const valid = await bcrypt.compare(

                password,

                user.password

            );

            if (!valid) {

                return res.json({

                    message: "Wrong Password"

                });

            }

            const token = jwt.sign(

                {

                    id: user.id,

                    email: user.email,

                    role: user.role

                },

                SECRET,

                {

                    expiresIn: "1h"

                }

            );

            res.json({

                message: "Login Success",

                token

            });

        }

    );

};

exports.profile = (req, res) => {

    res.json({

        message: "Profile Access",

        user: req.user

    });

};

exports.admin = (req, res) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({

            message: "Access Denied"

        });

    }

    res.json({

        message: "Welcome Admin"

    });

};