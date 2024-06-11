const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/signup",userController.registerUser);
router.post("/login",userController.signUser)

module.exports = router;