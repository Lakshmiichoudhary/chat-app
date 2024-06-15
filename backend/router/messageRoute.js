const express = require("express")
const authenticate = require("../middleware/auth")
const messageController = require("../controller/messageController")

const route = express.Router()


route.post("/",authenticate,messageController.sendMesssage);
route.get("/:chatId",authenticate,messageController.allMessage);


module.exports = route