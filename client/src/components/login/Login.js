import React from 'react'
import { useContext, useRef } from "react";
import "./Login.css";
import {useNavigate} from 'react-router-dom'

import AuthContext from '../context/AuthContext';


function Login() {
    const navigate=useNavigate();
    const email = useRef();
  const password = useRef();
  const { state,login } = useContext(AuthContext);

  const handleClick =async (e) => {
      console.log("handleclicked");
    e.preventDefault();
    login(
      { email: email.current.value, password: password.current.value }
      
    );
    // localStorage.setItem("pgsocialuser",state.user._id)
    navigate("/")
  };
  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">PGsocial</h3>
        <span className="loginDesc">
          Connect with friends and the world around you on PGsocial.
        </span>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            className="loginInput"
            ref={password}
          />
          <button className="loginButton" type="submit" >
            
              Log In
           
          </button>
          {/* <span className="loginForgot">Forgot Password?</span> */}
          <button className="loginRegisterButton" onClick={()=>{
              navigate("register")
          }}>
            
              "Create a New Account"
           
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login