import { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Route, Routes } from 'react-router-dom'
import { Chatsection } from './components/ChatSection'
import { PrivateRoute } from './Authentication/PrivateRoute'


function App() {
  

  return (
    <div className='w-screen bg-black h-screen'>
      
      
      
      <Routes>

        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chatSection' element={<PrivateRoute element={<Chatsection/>}/>}  />
      
      </Routes>
      


    </div>
  )
}

export default App
