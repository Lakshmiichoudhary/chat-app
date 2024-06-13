import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ChatPage from './components/pages/ChatPage';
import Error from './utils/Error';

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
