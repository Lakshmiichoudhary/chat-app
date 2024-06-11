const express = require("express");
const userController = require("../controller/userController");
const protect = require("../middleware/auth")

const router = express.Router();

router.post("/signup",userController.registerUser);
router.post("/login",userController.signUser);
router.get("/getuser",protect,userController.getUser)

module.exports = router;