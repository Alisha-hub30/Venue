import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteUser, get } from "../services/ApiEndpints";

export default function Admin(){
  const[users,setUsers]=useState([]);
  console.log('this is users',users )
  useEffect(()=>{
    const GetUsers=async()=>{
      try{
        const request=await get('api/admin/getuser')
        const response = request.data
        if (request.status === 200){
          setUsers(response.users)
        }

      }catch(error){
        console.log(error)
      }
    }
    GetUsers()
  },[users])

  const handleDelete=async(id)=>{
    try {
      const request=await deleteUser(`/api/admin/delete/${id}`)
      const response=request.data
      if (request.status===200) {
        toast.success(response.message)
        // setUsers(response.users)
      }
    }catch(error){
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
}

  return(
    <div>
      <div className='admin-container'>
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            
          </thead>
          <tbody>
            {users && users.map((elem,index)=>{
              return(
                <tr key={index}>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>
                <button onClick={() => handleDelete(elem._id)}>Delete</button>
                </td>
              </tr>
              )
            })}
              
            </tbody>
        </table>
      </div>
    </div>
  )
}