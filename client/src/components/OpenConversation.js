import React, { useCallback, useEffect, useState } from 'react'
import {Button, Form, InputGroup} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from '../api/messagesAPI';
import {loadMessages} from '../api/messagesAPI'

import { addMessage} from './redux/Slices/UserSlice';

export default function OpenConversation({socket}) {
    const [text,setText] = useState('');
    const selectedConversation = useSelector(state=>state.user.selectedConversation)
    const contacts = useSelector(state=>state.user.contacts)

    const setRef =  useCallback(node=>{
      if(node){
        node.scrollIntoView({smooth:true})
      }
    },[])

    const messages = useSelector(state=>state.user.selectedConversation.messages)
    const user = useSelector(state=>state.user.id)
    const dispatch = useDispatch();
    
  

    useEffect(()=>{
        if(selectedConversation.conversation)dispatch(loadMessages(selectedConversation.conversation));
    },[dispatch,selectedConversation.conversation])

    useEffect(()=>{
      if(socket==null)return;
      socket.on('receive-message',({conversation})=>dispatch(loadMessages(conversation)))
      return () => socket.off('recieve-message')
    },[socket,dispatch])

    

    function formatedMessages (messagesArray) {
      const messages = messagesArray.map(message=>{
        const contact = contacts.find(contact=>{
          return contact.contact_user_id === message.user_id;
        })
        const name = (contact && contact.name) || message.user_id;
        const fromMe = user === message.user_id;
        return { ...message, senderName:name, fromMe }
      })
      return messages
    }

    function handleSubmit(e){
        e.preventDefault()
        if(selectedConversation.messages[0]===undefined){
          socket.emit('make-conversation',{recipients:selectedConversation.recipients,conversationObj:selectedConversation,name:user})
        }
        postMessage(text,selectedConversation.conversation,user)
        socket.emit('send-message',{recipients:selectedConversation.recipients,conversation:selectedConversation.conversation})
        setText('')
        dispatch(addMessage({user_id:user,text:text}))
    }
  return (
    <div className = "d-flex flex-column flex-grow-1">
      <div className = 'flex-grow-1 overflow-auto'>
      <div className = ' d-flex flex-column align-items-start justify-content-end px-3'>
        {messages && formatedMessages(messages).map((message,index)=>{
          const lastMessage = messages.length - 1 === index;
          return (
            <div ref = {lastMessage ? setRef : null } key = {index} className ={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}>

              <div className = 
              {`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                {message.text}
              </div>

              <div className = {`text-muted small ${ message.fromMe ? 'text-right' : ''}`}>
                {message.fromMe ? 'You' : message.senderName}
              </div>

            </div>
          )
        })}
      </div>
      </div>
      <Form onSubmit={handleSubmit}>
          <Form.Group className = 'm-2'>
              <InputGroup>
                <Form.Control 
                as='textarea' 
                required 
                value = {text} 
                onChange={e=>setText(e.target.value)}
                style = {{height:'75px',resize:'none'}}
                />
                <InputGroup.Append>
                    <Button type='submit'>Send</Button>
                </InputGroup.Append>
              </InputGroup>
          </Form.Group>
      </Form>
    </div>
  )
}
