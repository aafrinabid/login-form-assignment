import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const authSlice=createSlice({
    name:'authentication',
    initialState:{
        isLoggedIn:true,
        role:0,
        status:'',
        change:true
    },
    reducers:{
        loginHandler(state,action){
            data=action.payload
            console.log(data)
          
                    state.isLoggedIn=true;
                    state.role=data.role
                    state.status=data.status
                    localStorage.setItem('token',data.token)
        },
        logoutHandler(state){
            console.log('happening')
            state.isLoggedIn=false;
            localStorage.removeItem('token')
            state.role=0
        },
        changeHandler(state){
            state.change=!state.change
        }
    }
    

})

export const authActions=authSlice.actions;
export default authSlice.reducer;