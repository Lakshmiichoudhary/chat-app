const Chat = require("../models/chatModel")
const User = require("../models/userModel")

exports.postChat = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.sendStatus(400);
      }
  
      let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user.id } } },
          { users: { $elemMatch: { $eq: userId } } }
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");
  
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
  
      if (isChat.length > 0) {
        return res.send(isChat[0]);
      } else {
        const chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user.id, userId]
        };
  
        const createdChat = await Chat.create(chatData);
  
        const fullChat = await Chat.findOne({ _id: createdChat._id })
          .populate("users", "-password")
          .populate("latestMessage");
  
        return res.status(201).send(fullChat);
      }
    } catch (err) {
      console.error("Error in postChat:", err);
      res.status(500).json({ message: "Failed to create or find chat" });
    }
};

exports.getChat = async (req, res) => {
    try {
        let results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
        });

        return res.status(200).send(results);
    } catch (error) {
        console.error("Error in getChat:", error);
        return res.status(400).json({ message: error.message });
    }
};

exports.createGroupChat = async (req, res) => {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).send({ message: "Please fill all the fields" });
        }

        var users = JSON.parse(req.body.users);

        if (users.length < 2) {
            return res.status(400).send("More than 2 users are required");
        }
        users.push(req.user);

        const groupChat = await Chat.create({
            chatName: req.body.name,  
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json(fullGroupChat);
    } catch (error) {
        console.error("Error during group chat creation:", error);
        return res.status(500).send({ message: "Failed to create group chat", error: error.message });
    }
};

exports.renameGroup = async (req,res) => {
    const { chatId ,chatName } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
        .populate("users","-password")
        .populate("groupAdmin","-password")

        if(!updateChat){
            res.status(404)
            throw new Error("Chat Not Found")
        } else {
            res.json(updateChat)
        }
}

exports.addGroup = async(req,res) => {
    const { chatId , userId} = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push : { users : userId },
        },
        { new : true}
    )
    .populate("user","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.status(404);
        throw new Error("Chat Not Found")
    } else {
        res.json(added)
    }
}

exports.removeUser = async(req,res) => {
    const { chatId , userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull : { users : userId },
        },
        { new : true}
    )
    .populate("user","-password")
    .populate("groupAdmin","-password")

    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found")
    } else {
        res.json(removed)
    }
}