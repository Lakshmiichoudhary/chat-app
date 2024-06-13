import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    console.log("User data:", userInfo);
    if (!userInfo && location.pathname !== "/signup" && location.pathname !== "/") {
      navigate("/signup");
    }
  }, [navigate, location]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
