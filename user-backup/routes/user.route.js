const express = require("express");
const router = express.Router();
const Usercontroller = require("../controllers/user.controller");

router.post("/register",Usercontroller.register);
router.post("/login",Usercontroller.login);
router.post("/logout",Usercontroller.logout);

module.exports = router;