import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { authActions } from './assets/store/authSlice';
import { snackActions } from './assets/store/snackbarSlice';
import SnackBar from './Components/Snackbar/SnackBar'
import Home from './pages/Home';

function App() {
  const dispatch=useDispatch()
  const history=useHistory()
  const loginState=useSelector(state=>state.authHandler.isLoggedIn)
  useEffect(()=>{
    axios.get('http://localhost:4000/isAuth',{
      headers:{
        'x-access-token':localStorage.getItem('token')?localStorage.getItem('token'):""
      }
    }).then(res=>{
      console.log('checking auth')
      if(res.data.auth){

        dispatch(authActions.loginHandler(res.data))
      }else{
      dispatch(authActions.logoutHandler())


      }
     
    }).catch((e)=>{
      console.log('kili');
      console.log(e.message)
      dispatch(authActions.logoutHandler())
      dispatch(snackActions.snackBarDetailsAdder({severity:'info',message:'session timed out',position:{vertical:'top',horizontal:'right'}}))
      history.replace('/login')
    })
  },[])
  return (
    <div className="App">
     <Switch>
      {!loginState && <Route path='/login' exact >
        <LoginPage />
      </Route>}

      {loginState && <Route path='/home'>
        <Home />
      </Route>}

      <Route path='*'>

{loginState?<Redirect to={`/home`}/>:<Redirect to='/login'/>}
</Route>
     </Switch>
     <SnackBar />
    </div>
  );
}

export default App;
