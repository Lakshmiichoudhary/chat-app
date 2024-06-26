import React from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getFullSender, getSender } from '../../utils/ChatLogic';
import ProfileModel from '../../User/ProfileModel';
import UpdateGroupChat from './UpdateGroupChat';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
          w="100%"
          fontFamily="Work sans"
          display="flex"
          justifyContent={{ base: "space-between" }}
          alignItems="center"
        >
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<ArrowBackIcon />}
            onClick={() => setSelectedChat(null)}
          />
          {!selectedChat.isGroupChat ? (
            <>
              {getSender(user, selectedChat.users)}
              <ProfileModel
                user={getFullSender(user, selectedChat.users)}
              />
            </>
          ) : (
            <>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroupChat
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              /> 
            </>
          )}
        </Text>
        <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
        </Box>    
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="2xl" pb={3} fontFamily="monospace">
            Select User and Start Chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
