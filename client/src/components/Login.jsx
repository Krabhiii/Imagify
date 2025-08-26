import React, { useContext, useEffect, useState } from 'react';
import { assets } from "../assets/assets.js";
import { AppContext } from '../context/AppContext.jsx';
import { motion } from "framer-motion";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === 'Login' ? '/api/user/login' : '/api/user/register';
      const payload = state === 'Login' ? { email, password } : { name, email, password };
      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div className='fixed inset-0 z-50 flex justify-center items-center'>
      <motion.div className='absolute inset-0 backdrop-blur-lg bg-black/40' aria-hidden />
      <motion.form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 z-10 w-full max-w-md mx-4'>
        <motion.img src={assets.cross_icon} className='absolute right-5 top-5 cursor-pointer' alt="close" onClick={() => setShowLogin(false)} />
        <motion.h1 className='text-4xl text-center font-bold text-zinc-800'>{state}</motion.h1>
        <motion.p className='font-semibold text-base mt-3'>Welcome back! please sign in to continue</motion.p>

        {state !== "Login" && (
          <div className='border px-6 py-3 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.profile_icon} width={30} alt="profile" />
            <input onChange={e => setName(e.target.value)} value={name} placeholder='Full Name' type='text' required />
          </div>
        )}

        <div className='border px-8 py-4 flex items-center gap-2 rounded-full mt-3'>
          <img src={assets.email_icon} width={20} alt="email" />
          <input onChange={e => setEmail(e.target.value)} value={email} placeholder='Email' type='email' required />
        </div>

        <div className='border px-8 py-4 flex items-center gap-2 rounded-full mt-3'>
          <img src={assets.lock_icon} width={20} alt="lock" />
          <input onChange={e => setPassword(e.target.value)} value={password} placeholder='Password' type='password' required />
        </div>

        <p className='text-base text-blue-600 my-4 cursor-pointer'>Forget password</p>

        <div className='flex justify-center items-center mt-8'>
          <button className='mt-2 bg-blue-600 text-white px-8 py-3 rounded-full'>
            {state !== "Login" ? "Create Account" : "Login"}
          </button>
        </div>

        <div className='mt-4 text-center'>
          {state === "Login" ? (
            <p>Don’t have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>
          )}
        </div>
        <ToastContainer />
      </motion.form>
    </motion.div>
  );
};

export default Login;
