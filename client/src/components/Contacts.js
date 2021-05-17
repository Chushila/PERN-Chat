import React from 'react'
import { useSelector } from 'react-redux'
import {ListGroup} from 'react-bootstrap'

export default function Contacts() {
    const contacts = useSelector(state=>state.user.contacts)
  return (
    <ListGroup variant='flush'>
        {contacts.map(contact => (
            <ListGroup.Item key = {contact.contact_user_id}>
                {contact.name}
            </ListGroup.Item>
        ))}
    </ListGroup>
  )
}
