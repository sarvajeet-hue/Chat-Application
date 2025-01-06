import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


export const Login = () => {

    const {handleSubmit , register}  = useForm()
    const [formData , setFormData] = useState({})

    function onSubmitForm(data){
        setFormData(data)
    }
    useEffect(() => {
        console.log("formData" , formData)
    } , [formData])

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmitForm)} >
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
