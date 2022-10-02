import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import snackbarSlice from "./snackbarSlice";

const store =configureStore({
    reducer:{snackBarHandler:snackbarSlice,authHandler:authSlice}
})

export default store;