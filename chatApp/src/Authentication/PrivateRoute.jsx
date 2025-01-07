import React from 'react'
import { Navigate } from 'react-router-dom'



export const PrivateRoute = ({element}) => {

    const Authentication = localStorage.getItem('token')
    if(!Authentication){
        console.log("authentication" , Authentication)
        alert("Logged in First")
        return <Navigate to="/login" />
    }
  return element
}
