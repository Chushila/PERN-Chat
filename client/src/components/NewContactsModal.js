
import React, { useRef } from 'react'
import { Form, Modal, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import contactsAPI from '../api/contactsAPI';
import {addContact} from './redux/Slices/UserSlice'

export default function NewContactsModal({closeModal}) {
    const idRef = useRef();
    const nameRef = useRef();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.id)

   async function handleSubmit(e){
        e.preventDefault()
        const data = await contactsAPI.addContact(user,idRef.current.value,nameRef.current.value)
        if(data.status === 200){
            dispatch(addContact({contact_user_id:idRef.current.value,name:nameRef.current.value}))
            closeModal();}
        else{
                document.getElementById('contactModal').innerHTML='User with that id is not found';
            }
    }

   
  return (
    <>
        <Modal.Header closeButton>Create Contact</Modal.Header>
        <Modal.Body id = "contactModal">
            <Form onSubmit = {handleSubmit}>
                <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type='text' ref = {idRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' ref = {nameRef} required/>
                </Form.Group>
                <Button type='submit'>Create</Button>
            </Form>
        </Modal.Body>
    </>
  )
}
