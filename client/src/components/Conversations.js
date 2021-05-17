import React, {useEffect, useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {selectConversation} from './redux/Slices/UserSlice'



export default function Conversations() {
  const [selectedConversationIndex,setSelectConversationIndex] = useState(0)
  const conversations = useSelector(state=>state.user.conversations)
  const [formatConversations,setFormatConversations] = useState([]);
  const contacts = useSelector(state=>state.user.contacts)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(conversations){
      setFormatConversations(conversations.map((el,index)=>{
        const recipients = el.recipients.map(r=>{
          const contact = contacts.find(contact=>{
            return contact.contact_user_id === r
          })
          const name = (contact && contact.name) || r;
          return { contact_user_id: r, name }
        })
        const selected = index === selectedConversationIndex;
        return {...el,recipients, selected}
      }))
    }
  },[conversations,selectedConversationIndex,contacts])

  useEffect(()=>{
    if(conversations){
      dispatch(selectConversation(formatConversations[selectedConversationIndex]))
    }
  },[formatConversations,dispatch,conversations,selectedConversationIndex])


  return (
   
      <ListGroup variant='flush'>
        {formatConversations && formatConversations.map((conversation,index) => (
            <ListGroup.Item 
            action
            active={conversation.selected}
            onClick={()=>setSelectConversationIndex(index)}
            key = {index}>
                {conversation.recipients.map(r=>r.name).join(', ')}
            </ListGroup.Item>
        ))}
    </ListGroup>
    
  )
}
