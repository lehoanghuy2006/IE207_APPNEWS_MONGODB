import axios from "axios";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginFailed, loginSuccess } from "./authSLice";

export const loginUser = async(user, dispatch,navigate) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");

    }catch(err){
        dispatch(loginFailed());

    }
}
