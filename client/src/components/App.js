import { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login'
import { addConversationIo, login } from './redux/Slices/UserSlice';
import Dashboard from './Dashboard'
import { loadContacts } from '../api/contactsAPI';
import {loadConversations} from '../api/convesationsAPI'
import {getUser} from '../api/userAPI'
import io from 'socket.io-client'

function App() {
  const dispatch = useDispatch();
  const [cookie] = useCookies(['user'])
  const user = useSelector(state=>state.user.id)
  const  [socket,setSocket] = useState()

  useEffect(()=>{
    const NewSocket = io('',{query:{id:user}})
      setSocket(NewSocket)
      return () => NewSocket.close()
  },[user,dispatch])

  useEffect(()=>{
    if(!cookie.user)getUser().then(res=>dispatch(login(res.id)))
  },[dispatch,cookie.user])

  useEffect(()=>{
    dispatch(login(cookie.user))
  },[cookie.user,dispatch])


  useEffect(()=>{
    if(user){
      dispatch(loadContacts(user))
      dispatch(loadConversations(user))
        }
  },[user,dispatch])
 
  useEffect(()=>{
    if(socket==null)return;
    socket.on('new-conversation',({conversationObj,name})=>{
      conversationObj.recipients = conversationObj.recipients.map(r=>r.contact_user_id)
      conversationObj.recipients=conversationObj.recipients.filter(r=>r!==user);
      conversationObj.recipients.push(name)
      dispatch(addConversationIo(conversationObj))
    })
    return () => socket.off('new-conversation')
  },[socket,dispatch,user])


  return (
    <div className="App" >
      <header className="App-header">
        {user ? <Dashboard socket = {socket}/>: <Login/>}
      </header>
    </div>
  );
}

export default App;
