const express = require("express");
const protect = require("../middleware/auth");
const chatController = require("../controller/chatController")

const route = express.Router();

route.post("/",protect,chatController.postChat);
route.get("/",protect,chatController.getChat);
route.post("/group",protect,chatController.createGroupChat);
route.put("/rename",protect,chatController.createGroupChat);
route.post("/add",protect,chatController.addGroup);
route.delete("./delete",protect,chatController.removeUser);

module.exports = route;