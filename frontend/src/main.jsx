import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './context/ChatProvider.jsx'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
)
