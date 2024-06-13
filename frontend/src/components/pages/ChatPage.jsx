import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import Sidebar from './Sidebar';
import { Box } from '@chakra-ui/react';
import Chats from './Chats';
import MessageBox from './MessageBox';

const ChatPage = () => {
  const {user} = ChatState();

  return (
    <div className='w-full'>
      {user && <Sidebar />}
      <Box display='flex' justifyContent='space-between'>
        {user && <Chats />}
        {user && <MessageBox />}
      </Box>
    </div>
  )
}

export default ChatPage
