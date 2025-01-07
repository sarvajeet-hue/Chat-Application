import React from 'react'
import { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

  const {handleSubmit , register}  = useForm()
      const [formData , setFormData] = useState({})
      const navigate = useNavigate()
      function onSubmitForm(data){
          setFormData(data)
          navigate('/login')
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

            <input className='border-black border rounded-md'  id='password' type="password" name = "password" {...register('password')}  />

            <button>
                Submit
            </button>
        </form>
    </div>
  )
}
