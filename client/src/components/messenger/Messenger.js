import React, { useEffect, useState,useRef,useContext } from 'react'
import Message from '../message/Message'
import Userlistitem from '../userlistitem/Userlistitem'
import './Messenger.css'
import AuthContext from '../context/AuthContext'
import {io} from "socket.io-client"


function Messenger() {
  const context=useContext(AuthContext);
  const socialid=JSON.parse(localStorage.getItem("pgsocialuser"));
    const [contactlist, setcontactlist] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const socket = useRef();
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
      socket.current=io("ws://localhost:8900");
      console.log("connected to socket")
      socket.current.on("getMessage", (data) => {
        console.log("getting messages")
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, [])

    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
    

    useEffect(() => {
      socket.current.emit("addUser", socialid);
      socket.current.on("getUsers", (users) => {
       
      });
    }, [socialid]);


  // Getting the list of contact list
    useEffect(async() => {
      console.log(socialid)
      const response= await fetch(`http://localhost/api/conversations/${socialid}`,{
          method:"GET",

          headers:{

          },
      }) 
      const json=await response.json();
      setcontactlist(json);
      console.log(contactlist)


    }, [])
    // setting the message from api
    useEffect(() => {
      const getMessages = async () => {
        try {
          const res = await fetch(`http://localhost/api/messages/${currentChat._id}`);
          const json=await res.json()
          setMessages(json);
          console.log(json)
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, [currentChat]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle Submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        // sender:"620677f06f4a909554a4d579" ,
        sender:socialid,
        text: newMessage,
        conversationId: currentChat._id,
      };
      console.log(message)
      const receiverId = currentChat.members.find(
        (member) => member !== socialid
      );
  
      socket.current.emit("sendMessage", {
        senderId: socialid,
        receiverId,
        text: newMessage,
      });
  
      try {
        const res = await fetch("http://localhost/api/messages",{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(message),


        } );
        const json=await res.json();
        console.log(json);
        setMessages([...messages,json]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
    
  return (
    <div className='messenger'>
        <div class="sidenav">
        {
            contactlist.map((contact,index)=>{
                return <div className='items' key={index} onClick={() => setCurrentChat(contact)}>
                    <Userlistitem conversation={contact}/>
                </div>
            })
        }
        
      </div>
      <div className="chatbox">
        <div className="chatboxwrapper">
              {/* <Message/> */}
              {currentChat ?(
                <>
                {
                  messages.map((message)=>{
                    return <div ref={scrollRef} >
                      <Message message={message} own={message.sender ===socialid} />
                    </div>
                  })
                }
                </>
              ):(
                <span className='noConversationText'>
                    Open a conversation to start a chat.
                </span>
              )}
        </div>
        <div className="chatBoxBottom">
                  {/* <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    // onChange={(e) => setNewMessage(e.target.value)}
                    // value={newMessage}
                  ></textarea> */}
                  <textarea 
                  className="chatMessageInput"
                  type="text" 
                  name="" 
                  id="" 
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  />
                  <button className="chatSubmitButton" 
                  onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
      </div>
    </div>
  )
}

export default Messenger