import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../../lib/Schema/authSchema';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link ,NavLink, useNavigate } from 'react-router'
import { signUpUser } from '../../../services/authServices';
import { toast } from 'react-toastify';

// import React, { useRef} from 'react'
// import { useEffect } from 'react'

export default function Register() {
  const navigate = useNavigate();

  // to get the error message returned from backend
  // const [errorMsg , setErrorMsg] = useState("")
  // const [successMsg , setSuccessMsg] = useState("")
  // I used react toastify later

  // useState for the eyeIcon
  const [showPass , setShowPass] = useState(false)
  
  // Controlled component on single input only

  // const [nameInput , setNameInput] = useState("")
  // console.log(nameInput)

  // the next line to be added to the Input component
  // onChange={(e)=> setNameInput(e.target.value)} value={nameInput}

  // What's with the value={nameInput} ??
  // Iam always telling the Input comp. to have the value of the state or it won't actually know the value of the input
  // this makes our component fully controlled 

  // Controlled component on the whole form 
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: ""
  // })
  // console.log(formData.name)
  // Spread Operator with Form Data ...
  // Update one value 
  // onChange={(e) => setFormData({...formData, name : e.target.value})}

  // Uncontolled component 
  // way similar to how we access the real dom without the need to search the dom (expensive exhusting low performance)
  // depending on the useRef Hook 
  // provides a way to create a mutable reference 
  // that persists for the lifetime of a component without causing re-renders when the value changes. 
  // It returns an object with a single current property, which holds the value. 
  // (current returns what it holds not a value of what it holds)

  // const nameInput = useRef()
  // in the Input : ref={nameInput} 
  // const emailInput = useRef()
  // const passwordInput = useRef()

  // useEffect(()=> {
  //   console.log(nameInput.current)
  //   console.log(emailInput.current)
  //   console.log(passwordInput.current)
  // },[])
  
  // making a function triggered by onSubmit on the form when submit button clicked
  //  <form onSubmit={submitData}>
  // so the values of inputs now are saved into object can be returned to backend  
  // function submitData(e){
  //   e.preventDefault()
  //   let formData = {
  //     name: nameInput.current.value,
  //     email : emailInput.current.value,
  //     password : passwordInput.current.value
  //   }
  //   console.log(formData)
  // }

  // Using React Hook Form(it works using uncontrolled component and handles it by itself)
  // const {register} = useForm();
  // console.log(register())
  // The right way to keep all the form data using defaultValues object inside the useForm 
  // adding the handleSubmit function which is responsible to submit the data into their right shape to the backend
  // later on handleSubnit will have the function that calls the API of the backend
  // , reset 
  const {register, handleSubmit, formState:{errors , isSubmitting }} = useForm(
    {
      resolver: zodResolver(registerSchema),
      mode:"all",
      defaultValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        dateOfBirth:"",
        gender:""
      }
    }
  );
  
  // This function only used to show that the handleSubmit returns the formdata (default values) to backend later on
  // it takes another fuction (callback) which will be the function calling the API later on
  async function submitData(data){
    console.log(data)
    try {
      // setErrorMsg("")
      // setSuccessMsg("")
      const response = await signUpUser(data)
      console.log(response)
      if (response.data.message == "success") {
        toast.success("Account is created successfully" , {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true
        })
        // setSuccessMsg("Account is created successfully")
        setTimeout(()=>{navigate('/login')} , 5000)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error,{
            position: "bottom-center",
            autoClose: 8000,
            hideProgressBar: true
        })
    }
    // reset()
  }

  return (
    <>
      <section className='w-full flex justify-center px-4 sm:px-6 md:px-12 lg:px-16'>
  <div className='w-full max-w-md sm:max-w-lg md:max-w-2xl space-y-3 overflow-auto max-h-[calc(100vh-4rem)]'>
    <h1 className='text-2xl sm:text-3xl font-bold text-blue-500 text-center md:text-left'>
      Welcome to Connect Social App
    </h1>
    <p className='text-base sm:text-lg font-medium text-blue-500 text-center md:text-left'>
      Sign-Up Right Now!
    </p>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitData)}>
      <Input
        {...register("name")}
        errorMessage={errors.name?.message}
        isInvalid={Boolean(errors.name)}
        classNames={{ label: "font-semibold" }}
        label='Name'
        type='text'
        labelPlacement="outside"
        placeholder="Enter your name"
        size='lg'
        className='w-full'
      />
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
        className='w-full'
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
        className='w-full'
      />
      <Input
        {...register("rePassword")}
        errorMessage={errors.rePassword?.message}
        isInvalid={Boolean(errors.rePassword)}
        classNames={{ label: "font-semibold" }}
        label='Re-Password'
        type='password'
        labelPlacement="outside"
        placeholder="Enter your password"
        size='lg'
        className='w-full'
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          {...register("dateOfBirth")}
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={Boolean(errors.dateOfBirth)}
          classNames={{ label: "font-semibold" }}
          label='Date Of Birth'
          type='date'
          labelPlacement="outside"
          size='lg'
          className='w-full sm:w-1/2'
        />
        <Select
          {...register("gender")}
          errorMessage={errors.gender?.message}
          isInvalid={Boolean(errors.gender)}
          classNames={{ label: "font-semibold" }}
          label='Gender'
          labelPlacement="outside"
          placeholder='Select gender'
          size='lg'
          className='w-full sm:w-1/2'
        >
          <SelectItem key="m">Male</SelectItem>
          <SelectItem key="f">Female</SelectItem>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <Button
          isLoading={isSubmitting}
          type='submit'
          className='bg-blue-500 text-white font-bold w-full sm:w-auto'
        >
          Sign Up
        </Button>
        <p className='text-sm sm:text-base font-medium text-center sm:text-left'>
          Already have an account?
          <span className='text-blue-500 font-bold'>
            <Link to="/login"> Sign-In</Link>
          </span>
        </p>
      </div>
    </form>
  </div>
</section>

    </>
  )
}
