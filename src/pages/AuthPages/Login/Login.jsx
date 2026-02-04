import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { logInSchema } from '../../../lib/Schema/authSchema';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from 'react';
import { Link ,NavLink, useNavigate} from 'react-router-dom'
import { signInUser } from '../../../services/authServices';
import { toast } from 'react-toastify';
import { authContext } from '../../../Context/AuthContext';
// import React, { useRef} from 'react'
// import { useEffect } from 'react'

export default function Login() {
  // State Management using context
  const {setToken} = useContext(authContext)

  // The backend returns the token when login success happens
  // so our aim to save that token to localstorage before navigating to home
  // this way is not effcient and we will use other ones later 

  // const [errorMsg , setErrorMsg] = useState("")
  // const [successMsg , setSuccessMsg] = useState("")
  const navigate = useNavigate();
  const [showPass , setShowPass] = useState(false)
  const {register, handleSubmit, formState:{errors, isSubmitting } }= useForm(
    {
      resolver: zodResolver(logInSchema),
      mode:"all",
      defaultValues:{
        email:"",
        password:""
      }
    }
  );
  
  async function submitData(data){
    console.log(data)
    try {
      // setErrorMsg("")
      // setSuccessMsg("")
      const response = await signInUser(data)
      console.log(response)
      localStorage.setItem("userToken", response.data.token)
      setToken(response.data.token)
      if (response.data.message == "success") {
        toast.success("Account Logged In successfully",{
            position: "bottom-center",
            hideProgressBar: true
        })
        // setSuccessMsg("Account Logged In successfully")
        setTimeout(()=>{navigate('/')} , 2000)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error,{
            position: "bottom-center",
            autoClose: 8000,
            hideProgressBar: true
        })
      // setErrorMsg(error.response.data.error)
    }
    // reset()
  }

  return (
    <>
      <section className='w-full flex justify-center px-4 sm:px-6 md:px-12 lg:px-16'>
  <div className='w-full max-w-md sm:max-w-lg md:max-w-2xl space-y-5'>
    <h1 className='text-2xl sm:text-3xl font-bold text-blue-500 text-center md:text-left'>
      Welcome to Connect Social App
    </h1>
    <p className='text-base sm:text-lg font-medium text-blue-500 text-center md:text-left'>
      Sign-In to your account!
    </p>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitData)}>
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={Boolean(errors.email)}
        classNames={{ label: "font-semibold" }}
        label='Email'
        type='email'
        labelPlacement="outside"
        placeholder="Enter your email"
        size='lg'
      />
      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={Boolean(errors.password)}
        classNames={{ label: "font-semibold" }}
        label='Password'
        type={showPass ? "text" : "password"}
        endContent={
          showPass
            ? <FaRegEyeSlash className='text-xl sm:text-2xl cursor-pointer' onClick={() => setShowPass(false)} />
            : <FaRegEye className='text-xl sm:text-2xl cursor-pointer' onClick={() => setShowPass(true)} />
        }
        labelPlacement="outside"
        placeholder="Enter your password"
        size='lg'
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <Button isLoading={isSubmitting} type='submit' className='bg-blue-500 text-white font-bold w-full sm:w-auto'>
          Sign In
        </Button>
        <p className='text-sm sm:text-base font-medium text-center sm:text-left'>
          Doesn't have an account? 
          <span className='text-blue-500 font-bold'>
            <Link to="/register"> Sign-Up</Link>
          </span>
        </p>
      </div>
    </form>
  </div>
</section>

    </>
  )
}
