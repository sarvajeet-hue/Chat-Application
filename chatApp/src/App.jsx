import { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Route, Routes } from 'react-router-dom'
import { Chatsection } from './components/ChatSection'


function App() {
  

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      
      
      
      <Routes>

        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chatSection' element={<Chatsection/>}  />
      </Routes>
      


    </div>
  )
}

export default App
