const express = require("express");

const router = express.Router();

const {

register,

login,

profile,

admin

} = require("../controllers/auth.controller");

const auth = require("../middleware/auth.middleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, profile);

router.get("/admin", auth, admin);

module.exports = router;