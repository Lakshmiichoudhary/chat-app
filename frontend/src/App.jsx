import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ChatPage from './components/pages/ChatPage'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/chat' element={<ChatPage />}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
