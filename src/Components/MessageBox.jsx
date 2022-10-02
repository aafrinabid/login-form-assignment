import { Button, TextareaAutosize } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../assets/store/authSlice'
import { snackActions } from '../assets/store/snackbarSlice'

function MessageBox() {
    const dispatch=useDispatch()
    const inputRef=useRef()
    const submitHandler=()=>{
        const text=inputRef.current.value
        if(text.length<=0){
return dispatch(snackActions.snackBarDetailsAdder({severity:'error',message:'type something message is empty',position:{vertical:'top',horizontal:'center'}}))
        }
        axios.post('https://login-form-assignment.herokuapp.com/addMessage',{text},{
            headers:{
                'x-access-token':localStorage.getItem('token')?localStorage.getItem('token'):""
            }
        }).then((res=>{
            if(res.data.update){
                dispatch(authActions.changeHandler())
                inputRef.current.value=''
                return dispatch(snackActions.snackBarDetailsAdder({severity:'success',message:'message added succesfully',position:{vertical:'top',horizontal:'center'}}))
            }
            
        })).catch((e)=>{
            console.log(e)
        })
    }

  return (
    <div style={{padding:'10px'}}>
        <TextareaAutosize
  aria-label="minimum height"
  minRows={3}
  ref={inputRef}
  placeholder="Message for this session"
  style={{ width: 900 }}
/>
<div>
<Button variant='contained'  onClick={submitHandler}>
    Submit
</Button>
</div>
    </div>
  )
}

export default MessageBox