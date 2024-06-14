const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.postChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID not provided" });
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
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
      return res.status(200).send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId]
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

    if (results.length === 0) {
      return res.status(200).send({ message: "No chats found" });
    }

    return res.status(200).send(results);
  } catch (error) {
    console.error("Error in getChat:", error);
    return res.status(400).json({ message: error.message });
  }
};

exports.createGroupChat = async (req, res) => {
  try {
    //console.log('Request Body:', req.body);

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }

    let users;
    try {
        users = JSON.parse(req.body.users);
    } catch (parseError) {
        console.error('Error parsing users:', parseError);
        return res.status(400).send({ message: "Invalid users format" });
    }

    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        console.error('Error creating group chat:', error);
        res.status(400).send({ message: "Failed to create the group chat" });
    }
} catch (error) {
    console.error("Error in createGroupChat:", error);
    res.status(500).send({ message: "Failed to create group chat" });
}
};

exports.renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!chatId || !chatName) {
    return res.status(400).send({ message: "Chat ID and new chat name are required" });
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).send({ message: "Chat not found" });
    } else {
      return res.json(updatedChat);
    }
  } catch (error) {
    console.error("Error in renameGroup:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.addGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      return res.status(404).send({ message: "Chat not found" });
    } else {
      return res.json(added);
    }
  } catch (error) {
    console.error("Error in addGroup:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.removeUser = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return res.status(404).send({ message: "Chat not found" });
    } else {
      return res.json(removed);
    }
  } catch (error) {
    console.error("Error in removeUser:", error);
    return res.status(500).json({ message: error.message });
  }
};
