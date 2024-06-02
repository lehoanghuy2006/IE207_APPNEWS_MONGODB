import {configureStore} from "@reduxjs/toolkit";
import authSLice from "./authSLice";

export default configureStore({
    reducer:{
        auth: authSLice,
    },
});