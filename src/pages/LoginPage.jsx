import * as React from 'react';
import { useRef ,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../assets/store/authSlice';
import { snackActions } from '../assets/store/snackbarSlice';
import { useHistory } from 'react-router-dom';


const theme = createTheme();

export default function LoginPage() {

  const [loginState,setLoginState]=useState(true)
  const dispatch=useDispatch()
  const history =useHistory()
  const passwordRef=useRef()
  const emailRef=useRef()
  const usernameRef=useRef()
  const mobileNumber=useRef()
  function ValidateEmail(inputText)
 {
 var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if(inputText.match(mailformat))
 {
  console.log('matched')
  return true
 
 }
 else
 {
  console.log('hurrrah')
  
  return false;
 }
 }
 function phonenumber(inputtxt){
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno)){
      return true;
        }
      else
        {
        return false;
        }
}
  const handleSubmit = (e) => {
    e.preventDefault()
    const email=!loginState? emailRef.current.value : ''
    const password= passwordRef.current.value
    const username=passwordRef.current.value
    const mobile= !loginState? mobileNumber.current.value :''
    if(!loginState){
      const emailState=ValidateEmail(email)
      if(!emailState){
      dispatch(snackActions.snackBarDetailsAdder({severity:'info',message:'This is not a valid email',position:{vertical:'top',horizontal:'center'}}))
  emailRef.current.focus();
      return
      }
      const mobileState=phonenumber(mobile)
      if(!mobileState){
      dispatch(snackActions.snackBarDetailsAdder({severity:'info',message:'This is not a valid Number',position:{vertical:'top',horizontal:'center'}}))
        mobileNumber.current.focus();
        return
      }
      if(password.length<=0 || username.length<=0){
      dispatch(snackActions.snackBarDetailsAdder({severity:'info',message:'fill the inputs',position:{vertical:'top',horizontal:'center'}}))
return
      }

    }else{
      if(password.length<=0 || username.length<=0){
        dispatch(snackActions.snackBarDetailsAdder({severity:'info',message:'fill the inputs',position:{vertical:'top',horizontal:'center'}}))
  return
        }

    }
    let url=loginState?'http://localhost:4000/login':'http://localhost:4000/registeruser'
    axios.post(url,{
      email,
      password,
      username,
      mobile
    }).then((res)=>{
      console.log(res)
      dispatch(authActions.loginHandler(res.data))
      dispatch(snackActions.snackBarDetailsAdder({severity:'success',message:'logged in',position:{vertical:'top',horizontal:'center'}}))
      history.replace('/home')
    }).catch(e=>{
      console.log(e)
      dispatch(snackActions.snackBarDetailsAdder({severity:'error',message:e.response.data.message,position:{vertical:'top',horizontal:'center'}}))
    })
};
const loginHandler=()=>{
  setLoginState(prevState=>!prevState)
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {loginState?'Login here!!': 'Register your account'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {!loginState && <TextField
              inputRef={emailRef}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />}
                  <TextField
              inputRef={usernameRef}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
                {!loginState &&  <TextField
              inputRef={mobileNumber}
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="mobile"
              name="mobile"
              autoComplete="mobile"
              autoFocus
            />}
            <TextField
              inputRef={passwordRef}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
         {loginState?'login': 'Register'}
            </Button>
            <Grid container>
            
              <Grid item>
                <Link onClick={loginHandler} variant="body2">
                  {"Don't have an account? Register here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}