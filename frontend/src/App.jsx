import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Error from './utils/Error';
import ChatPage from './components/ChatBox/ChatPage';

const App = () => {
 
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/chat' element={<ChatPage />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
};

export default App;
