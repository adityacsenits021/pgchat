import React from 'react'
import { format } from "timeago.js";
import './message.css'

function Message({own,message}) {
  return (
    <div className={own ? "message own" : "message"}>
       <div className="messageTop">
        
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message