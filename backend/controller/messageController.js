const Chat = require("../models/chatModel");
const Message = require("../models/messageModel")
const User = require("../models/userModel")

exports.sendMesssage = async (req,res) => {
    try{
        const { content, chatId} = req.body;

        if(!content || !chatId){
            return res.sendStatus(400);
        }
        var newMessage = {
            sender : req.user.id,
            content : content,
            chat : chatId
        }

        var message = await Message.create(newMessage);
        message = await message.populate("sender","name pic")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path : "chat.users",
            select : "name pic email",
        })
        await Chat.findbyIdAndUpdate(req.body.chatId,{
            latestMessage : message,
        })
        res.json(message)
    }catch(error){
        throw new Error(error.message)
    }
}

exports.allMessage = async(req,res) => {
    try{
        const message = await Message.find({chat : req.params.chatId})
        .populate("sender","name pic email")
        .populate("chat")

        res.json(message)
    }catch(error){
        throw new Error(error.message)
    }
}