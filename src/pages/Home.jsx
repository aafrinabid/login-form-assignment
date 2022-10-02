import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AdminDetailsTable from '../Components/AdminDetails'
import DetailsTable from '../Components/DetailsTable'
import MessageBox from '../Components/MessageBox'
import ButtonAppBar from '../Components/ui/NavBar'
import Welcome from '../Components/Welcome'

const adminColumn=[]
function Home() {
    const [isLoading,setIsLoading]=useState(false)
    const role=useSelector(state=>state.authHandler.role)
    const change=useSelector(state=>state.authHandler.change)
    
    const [details,setDetails]=useState([])
    console.log(details)
    const [username,setUsername]=useState('')
    useEffect(()=>{
        setIsLoading(true)
    axios.get('https://login-form-assignment.herokuapp.com/getDetails',{
        headers:{
            'x-access-token':localStorage.getItem('token')?localStorage.getItem('token'):""
        }
    }).then(res=>{
        setDetails([...res.data.details])
        setUsername(res.data.username)
        setIsLoading(false)
    }).catch(e=>{
        setIsLoading(false)

    })

    },[change])
  return (
    <div>
        <ButtonAppBar />
        <Welcome username={role==0?username:'admin'}/>
 {role===0 &&      <MessageBox />}
    <h1>DETAILS</h1>
    <div style={{padding:'10px'}}>
       {role ===0 && <DetailsTable rows={details}/>}
       {role ===1 && <AdminDetailsTable rows={details}/>}
       </div>
    </div>
  )
}

export default Home