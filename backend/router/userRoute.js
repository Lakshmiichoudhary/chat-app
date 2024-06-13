const express = require("express");
const userController = require("../controller/userController");
const authenticate = require("../middleware/auth")

const router = express.Router();

router.post("/signup",userController.registerUser);
router.post("/login",userController.signinUser);
router.get("/getuser",authenticate,userController.getUser)

module.exports = router;