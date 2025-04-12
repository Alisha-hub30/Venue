import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import About from './pages/About'
import Conatct from './pages/Conatct'
import EmailVerify from './pages/EmailVerify'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Services from './pages/Services'
import Venue from './pages/Venue'
import VenueDetails from './pages/VenueDetails'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/contact' element={<Conatct/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/venue" element={<Venue />}/>
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App