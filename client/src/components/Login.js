
import React, { useRef } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {login, createNew} from './redux/Slices/UserSlice'


export default function Login() {
    const idRef = useRef();
    const dispatch = useDispatch();
    const [cookies,setCookie] = useCookies(['user'])

    function hadleCookies(){
        setCookie("user",idRef.current.value,{
            path:'/'
        })
    }
    function handleSubmit (e){
        e.preventDefault();
        hadleCookies();
        dispatch(login(idRef.current.value))
    }
  return (
    <Container className = "align-items-center d-flex" style = {{height:'100vh'}}>
        <Form className = "w-100" onSubmit = {handleSubmit}>
            <Form.Group>
                <Form.Label>Enter you Id</Form.Label>
                <Form.Control type = 'text' ref = {idRef} required/>
            </Form.Group>
            <Button type = 'submit' className = "mr-2">Login</Button>
            <Button variant = 'secondary' onClick = {()=>dispatch(createNew())} > Create A New Id </Button>
        </Form>
    </Container>
  )
}
