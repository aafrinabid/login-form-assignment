import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DetailsTable from '../Components/DetailsTable'
import MessageBox from '../Components/MessageBox'
import ButtonAppBar from '../Components/ui/NavBar'
import Welcome from '../Components/Welcome'

function Home() {
    const role=useSelector(state=>state.authHandler.role)
    const [details,setDetails]=useState([])
    console.log(details)
    const [username,setUsername]=useState('')
    useEffect(()=>{
    axios.get('http://localhost:4000/getDetails',{
        headers:{
            'x-access-token':localStorage.getItem('token')?localStorage.getItem('token'):""
        }
    }).then(res=>{
        setDetails([...res.data.details])
        setUsername(res.data.username)
    })

    },[])
  return (
    <div>
        <ButtonAppBar />
        <Welcome username={role==1?'admin':username}/>
 {role===0 &&      <MessageBox />}
       <DetailsTable userState={role==0?true:false} rows={details}/>

    </div>
  )
}

export default Home