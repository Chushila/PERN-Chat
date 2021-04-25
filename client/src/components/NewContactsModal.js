
import React, { useRef } from 'react'
import { Form, Modal, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addContact } from './redux/Slices/UserSlice';

export default function NewContactsModal({closeModal}) {
    const idRef = useRef();
    const nameRef = useRef();
    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault()
        dispatch(addContact({id:idRef.current.value,name:nameRef.current.value}));
        closeModal();
    }
  return (
    <>
        <Modal.Header closeButton>Create Contact</Modal.Header>
        <Modal.Body>
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
