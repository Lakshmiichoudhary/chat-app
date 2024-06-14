import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import Sidebar from './Sidebar';
import { Box } from '@chakra-ui/react';
import Chats from './Chats';
import MessageBox from './MessageBox';

const ChatPage = () => {
  const {user} = ChatState();
  const { fetchAgain , setFetchAgain } = useState(false)

  return (
    <div className='w-full'>
      {user && <Sidebar />}
      <Box display='flex' justifyContent='space-between'>
        {user && <Chats fetchAgain={fetchAgain} />}
        {user && <MessageBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default ChatPage
