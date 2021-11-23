
import React from 'react'
import {Container, Button} from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {createNew} from './redux/Slices/UserSlice'
import {createUser} from '../api/userAPI'
import {v4 as uuidV4} from 'uuid' 

export default function Login() {
    const dispatch = useDispatch();
    const [Cookie,setCookie] = useCookies(['user'])

    function hadleCookies(id){
        setCookie("user",id,{
            path:'/'
        })
    }

    function guestSubmit (e){
     const id  = uuidV4();
      dispatch(createNew(id))
      createUser(id)
      hadleCookies(id);
    }
  return (
    <Container className = "align-items-center d-flex" style = {{height:'100vh'}}>
        
            <Button className="btn btn-lg btn-google btn-block text-uppercase btn-outline p-3" href="/google/"><img src="https://img.icons8.com/color/16/000000/google-logo.png" alt ='googleLogo'/> Signup Using Google</Button>
            <Button variant = 'secondary' className = "btn btn-md m-1 p-2" onClick = {guestSubmit} > Sign in as a Guest </Button>
       
    </Container>
  )
}
