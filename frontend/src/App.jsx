import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from './components/Navbar'
import AdminLayout from "./Layouts/AdminLayout"
import PublicLayouts from './Layouts/PublicLayout'
import UserLayout from './Layouts/UserLayout'
import Admin from './pages/Admin'
import Home from './pages/Home'
import LandingPage from './pages/Landingpage'
import Login from './pages/Login'
import Register from './pages/Register'
import { updateUser } from './redux/AuthSlice'

export default function App() {
const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(updateUser())
  },[])
  return (
    <>
    <BrowserRouter>
    <Toaster/>
    <Routes>
      
              <Route path='/home' element={<UserLayout/>} >
              <Route index element={<Home/>}/>

              </Route>
              <Route path='/admin' element={<AdminLayout/>}>
              <Route index element={<Admin/>}/>

              </Route>
              <Route path='/' element={<PublicLayouts/>}>
              <Route index element={<LandingPage/>}/>
              <Route path='/navbar' element={<NavBar/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
                
              </Route>
    
    </Routes>
    
    </BrowserRouter>
    </>
  )
}
