import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PRIMARY_URL } from '../PrimaryUrl'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../slices/loginSlice'

export const Login = () => {

    const {handleSubmit , register}  = useForm()
    const [formData , setFormData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.loginReducers)


   async function onSubmitForm(data){
        setFormData(data)
        try {
            const response = await axios.post(`${PRIMARY_URL}/login` , data)
            console.log("response in login" , response)
            if(response){
                dispatch(setToken(response?.data?.token))
                navigate('/chatSection')
            }
        }catch(error){
            console.log("error" , error?.response?.data?.message)
        }
    
    }
    useEffect(() => {
        console.log("token" , token )
    } , [token])

  return (
    <div className='flex items-center justify-center w-full h-full'>
        <form className='flex items-center justify-center flex-col border bg-gray-300 p-3 rounded-lg' onSubmit={handleSubmit(onSubmitForm)} >
            <label htmlFor='username'>
                Username
            </label>

            <input className='border-black border rounded-md p-2' placeholder='Enter Your Username'  id='username' type="email" name = "username" {...register('username')}  />

            <label htmlFor='password'>
                Password
            </label>

            <input className='border-black border rounded-md p-2' placeholder='Enter Your Password'  id='password' type="password" name = "password" {...register('password')}  />

            <button className='flex items-center justify-center px-2 py-1 border font-serif font-bold rounded-md text-white bg-blue-300 w-full mt-3'>
                Submit
            </button>
        </form>

        <p>Don't have a Account <button onClick={() => navigate('/')}  className='flex items-center justify-center rounded-md p-2'>Register </button> </p>
    </div> 
  )
}
