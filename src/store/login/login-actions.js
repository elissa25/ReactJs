import { loginActions } from "./login-slice";

import axios from "axios";


export const loginUser = (userlogin) => {
    return async (dispatch) => {
        dispatch(loginActions.loginRequest());
        await axios.post("http://34.245.213.76:3000/auth/signin",{
            username: userlogin.username,
            password: userlogin.password,
            headers: {
                "Content-Type":"application/json",
            }
        })
        .then((res)=>{
            const token = res.data.accessToken;
            localStorage.setItem("token", token);
            dispatch(loginActions.successLogin(token));
        })
        .catch((err)=>{
            dispatch(loginActions.failedLogin("Please check your login credentials"));
        })
    }
}
export const logout = () =>{
  return async (dispatch) => {
  dispatch(loginActions.Logout());
  }
}

