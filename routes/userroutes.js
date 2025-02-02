const express = require("express");
const { singin, singup } = require("../controller/usercontroller.js");

const router = express.Router();

router.post("/register", singup);
router.post("/login", singin);

module.exports = router;
