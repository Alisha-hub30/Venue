import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)
    
    const getAuthState = async ()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        }catch(error){
            console.error('Auth state error:', error.response?.data || error)
        }
    }

    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            console.log('Full API response:', data) // Add this to see the entire response
            console.log('userData object:', data.userData) // Add this to see the userData object
            console.log('User role:', data.userData?.role) // Specifically log the role
            
            if(data.success) {
                // Before setting userData, let's log what we're about to set
                console.log('Setting userData to:', data.userData)
                setUserData(data.userData)
                
                // Check if user is admin and log message
                if(data.userData && data.userData.role === 'admin') {
                    console.log('Admin is logged in')
                    console.log('Admin name:', data.userData.name)
                    console.log('Admin email:', data.userData.email)
                } else if (data.userData) {
                    console.log('Regular user logged in with role:', data.userData.role)
                } else {
                    console.log('No user data available')
                }
            } else {
                toast.error(data.message)
            }
        }catch(error){
            console.error('Get user data error:', error.response?.data || error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(()=>{
        console.log('AppContext initialized - checking auth state...')
        getAuthState();
    },[])

    // Add effect to monitor userData changes
    useEffect(() => {
        if (userData) {
            console.log('User data updated:', userData)
            console.log('User role:', userData.role)
            if (userData.role === 'admin') {
                console.log('Admin is logged in (from userData update)')
            }
        }
    }, [userData])

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }
    
    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}