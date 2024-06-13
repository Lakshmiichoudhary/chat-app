const express = require("express");
const authenticate = require("../middleware/auth");
const chatController = require("../controller/chatController")

const route = express.Router();

route.post("/",authenticate,chatController.postChat);
route.get("/",authenticate,chatController.getChat);
route.post("/group",authenticate,chatController.createGroupChat);
route.put("/rename",authenticate,chatController.renameGroup);
route.post("/add",authenticate,chatController.addGroup);
route.delete("./delete",authenticate,chatController.removeUser);

module.exports = route;