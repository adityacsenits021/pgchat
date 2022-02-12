import React, { useState} from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => { 
  const host = "http://localhost";
 
  

  


  const login=async(clientdata)=>{
        try {
            const response=await fetch(`${host}/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(clientdata),
            })
            const json=await response.json();
            console.log(json)
            
            localStorage.setItem("pgsocialuser",JSON.stringify(json._id))
        } catch (error) {
            console.log(error);
        }
  }


  return (
    <AuthContext.Provider
      value={{ login }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
