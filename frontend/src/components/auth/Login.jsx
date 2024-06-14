import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isError, setIsError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      //console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      //console.log("user",data)
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error);
      setIsError(error.message);
    }
  };

  return (
    <div className='lg:flex md:flex h-screen'>
      <div className='lg:w-6/12 p-2 font-bold'>
        <form className='p-2 m-4 lg:mx-20 lg:my-28 border-4 h-3/6 shadow-2xl from-cyan-800'
              onSubmit={(e) => e.preventDefault()}>
          <h1 className='p-2 mx-3 text-center font-semibold text-2xl text-cyan-700'>Login</h1>
          <input className='w-full p-3 my-2 outline-none bg-gray-200'
                 type='email'
                 placeholder='xyz@gmail.com'
                 ref={emailRef} />
          <div className='flex'>
            <input className='w-full p-3 my-2 outline-none bg-gray-200'
                   type={!show ? 'password' : "text"}
                   placeholder='*********'
                   ref={passwordRef} />
            <IconButton
              className='my-3 p-6'
              colorScheme='blue'
              aria-label='Toggle Password Visibility'
              icon={!show ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShow(!show)}
            />
          </div>
          <p className='p-2 text-red-700 font-semibold'>{isError}</p>
          <button className='p-3 bg-cyan-600 w-full text-white rounded-md mt-4 hover:bg-cyan-700'
                  onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
      <div className='lg:w-6/12 bg-gradient-to-b from-cyan-700 to-cyan-500'>
        <div className='p-2 lg:my-36 text-center'>
          <Link to="/signup">
            <button className='p-2 mb-36 text-white text-2xl'>
              New here? Click here to Sign Up
            </button>
          </Link>
          <h1 className='p-2 text-white text-5xl font-bold'>Bridge</h1>
          <p className='p-2 text-white mt-2 text-3xl'>Bridge the gap. Log in and reconnect.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
