import React from 'react'
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import './Register.css'


function Register() {
    const navigate=useNavigate();
    const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        // await axios.post("/auth/register", user);
        const response=await fetch("http://localhost/api/auth/register",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                
              },
              body:JSON.stringify(user),


        })
        // history.push("/login");
        navigate("/login")
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">PgSocial</h3>
          <span className="loginDesc">
            Talk with friends and the world around you on pgsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={()=>{
                navigate("login")
            }}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register