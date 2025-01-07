import React from 'react'
import { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { PRIMARY_URL } from '../PrimaryUrl'


export const Register = () => {

  const {handleSubmit , register}  = useForm()
      const [formData , setFormData] = useState({})
      const navigate = useNavigate()
      async function onSubmitForm(data){
          setFormData(data)
          try {
            const response = await axios.post(`${PRIMARY_URL}/register` , data)
            console.log("response " , response)
            if(response){
              navigate('/login')
            }
          }catch(error){
            console.log("error while register in frontend" , error?.response?.data?.message)
            alert(error?.response?.data?.message)
          }  
      }
      useEffect(() => {
          console.log("formData" , formData)
      } , [formData])

      

  
  return (
    <div className='flex items-center justify-center'>
        <form className='flex items-center justify-center flex-col border bg-gray-300 p-3 rounded-lg' onSubmit={handleSubmit(onSubmitForm)} >
            <label htmlFor='username'>
                Username
            </label>

            <input className='border-black border rounded-md'  id='username' type="email" name = "username" {...register('username')}  />

            <label htmlFor='password'>
                password
            </label>

            <input className='border-black border rounded-md'  id='password' type="password" name = "password" {...register('password' , {required : "password is required"})}  />

            <button >
                Submit
            </button>
        </form>
    </div>
  )
}
