import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarBadge, IconButton, useToast, Button } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import handleValidation from '../../utils/Validation';
import { ChatState } from '../../context/ChatProvider';

const Signup = () => {
  const [isError, setIsError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { setUser } = ChatState();

  const handleSignup = async () => {
    const message = handleValidation(
      name.current.value,
      email.current.value,
      password.current.value
    );
    setIsError(message);

    if (message) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/user/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          pic: avatar
        })
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setIsError(data.message);
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      setIsError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'chat-app');
        data.append('cloud_name', 'dhzfruq0g');

        try {
          const response = await fetch('https://api.cloudinary.com/v1_1/dhzfruq0g/image/upload', {
            method: 'POST',
            body: data,
          });
          const result = await response.json();
          setAvatar(result.url);
        } catch (error) {
          toast({
            title: 'Error uploading image.',
            description: 'Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        } finally {
          setLoading(false);
        }
      } else {
        toast({
          title: 'Please select a valid image file.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className='lg:flex md:flex h-screen'>
      <div className='lg:w-6/12 bg-gradient-to-b from-cyan-700 to-cyan-500'>
        <div className='p-2 lg:my-36 text-center'>
          <h1 className='p-2 text-white text-5xl font-bold'>Bridge</h1>
          <p className='p-2 text-white mt-2 text-3xl'>Connecting people across distances</p>
          <Link to="/"><button className='p-2 mt-36 text-white text-2xl'>Already a member? Log in</button></Link>
        </div>
      </div>
      <div className='lg:w-6/12 p-2 font-bold'>
        <form className='p-2 m-4 lg:mx-28 lg:my-24 border-4 shadow-2xl from-cyan-800' onSubmit={e => e.preventDefault()}>
          <div className='flex justify-center mb-4' onClick={handleAvatarClick}>
            <Avatar size='xl' src={avatar}>
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </div>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept='image/*'
            onChange={handleFileChange}
          />
          <h1 className='p-2 mx-3 text-center font-semibold text-2xl text-cyan-700'>Signup</h1>
          <input className='w-full p-3 my-2 outline-none bg-gray-200' type='text' placeholder='Name' ref={name} />
          <input className='w-full p-3 my-2 outline-none bg-gray-200' type='email' placeholder='xyz@gmail.com' ref={email} />
          <div className='flex'>
            <input className='w-full p-3 my-2 outline-none bg-gray-200'
              type={!show ? 'password' : 'text'}
              placeholder='*********'
              ref={password} />
            <IconButton
              className='my-2 p-3'
              colorScheme='blue'
              aria-label='Toggle password visibility'
              icon={!show ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShow(!show)}
            />
          </div>
          <p className='p-2 text-red-700 font-semibold'>{isError}</p>
          <Button colorScheme='cyan' textColor={'white'} w='100%' p='6' isLoading={loading} onClick={handleSignup}>
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
