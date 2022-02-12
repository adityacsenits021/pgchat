import React, { useEffect, useState,useContext } from 'react'
import './userlistitem.css'
import AuthContext from '../context/AuthContext';

function Userlistitem({conversation}) {
  const context=useContext(AuthContext);
  // const socialid= "620677f06f4a909554a4d579";
  const socialid=JSON.parse(localStorage.getItem("pgsocialuser"));
  const [User, setUser] = useState("")
  useEffect(() => {
    console.log(socialid);
    console.log("The members are:",conversation.members)
    // const friendId = conversation.members.find((m) => m !== "620677f06f4a909554a4d579"); 
    const friendId = conversation.members.find((m) => m !== socialid); 
    console.log(friendId)
    const getUser = async () => {
      try {
        // const res = await axios("/users?userId=" + friendId);
        const res=await fetch(`http://localhost/api/auth/getuser/${friendId}`);
        const json=await res.json();
        console.log(json)
        setUser(json);
        console.log(User)
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [conversation]);
  return (
    <>
        <div className="user" onClick={()=>
        console.log("clicked")}>
          <div className="userimg">
            <img src="https://media.istockphoto.com/photos/abstract-wavy-object-picture-id1198271727?b=1&k=20&m=1198271727&s=170667a&w=0&h=b626WM5c-lq9g_yGyD0vgufb4LQRX9UgYNWPaNUVses=" alt="" srcset="" />
          </div>
          <div className="userinfo">
            <p>{User.username}</p>
          </div>
    </div>
    </>
  )
}

export default Userlistitem