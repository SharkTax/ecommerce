import React, { useCallback } from 'react'
import {LoginBG} from "../assets"
import {FcGoogle} from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth } from '../config/firebase.config'

const Authentication = () => {

  const googleProvider = new GoogleAuthProvider()

  const handleLoginAction = useCallback(async()=>{
    try{
      const userCred = await signInWithPopup(auth, googleProvider);
      if(userCred){
        console.log(userCred);
      }
    }catch(e){
        console.error(e)
    }
  },[])

  return (
    <div style={{
      background: `url(${LoginBG})`,
      backgroundSize: `cover`,
      backgroundPosition: `center`,
      backgroundRepeat: `no-repeat`
    }}
    className='w-screen h-screen flex items-center justify-center px-4 py-6'
    >
      
      <div className='w-full lg:w-96 px-4 py-6 rounded-md backdrop-blur-md flex items-center
      justify-center flex-col gap-8 bg-[rgba(255,255,255,0.1)]'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='text-2xl text-white'>Welcome Back</p>
          <p className='text-lg text-gray-200'>Sing in to access your store</p>
        </div>
        


        <div onClick={handleLoginAction} className='w-full lg:w-auto px-4 py-3 flex items-center justify-center border
        border-gray-200 cursor-pointer rounded-md active:scale-95 transition-all
        duration-150 ease-in-out gap-4 bg-[rgba(255,255,255,0.2)]'>
          <FcGoogle className='text2xl'/>
          <p className='text-lg font-semibold text-white'>Sign with email</p>
        </div>
      </div>
      
    
    </div>
  )
}

export default Authentication