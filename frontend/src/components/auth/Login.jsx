import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [isError, setIsError] = useState("")

    const handleLogin = async() => {

    }

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
        <input className='w-full p-3 my-2 outline-none bg-gray-200'
          type='password'
          placeholder='*********'
          ref={passwordRef} />
        <p className='p-2 text-red-700 font-semibold'>{isError}</p>
        <button className='p-3 bg-cyan-600 w-full text-white rounded-md mt-4 hover:bg-cyan-700' onClick={handleLogin}>
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
)
}
        
export default Login
