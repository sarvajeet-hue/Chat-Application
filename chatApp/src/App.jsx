import { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      
      
      
      <Routes>

        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      


    </div>
  )
}

export default App
