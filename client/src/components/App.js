import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login'
import { login } from './redux/Slices/UserSlice';
import Dashboard from './Dashboard'


function App() {
  const dispatch = useDispatch();
  const [cookie,setCookie] = useCookies(['user'])
  const user = useSelector(state=>state.user.id)

  useEffect(()=>{
    dispatch(login(cookie.user))
  },[])
  return (
    <div className="App">
      <header className="App-header">
        {user ? <Dashboard/>: <Login/>}
      </header>
    </div>
  );
}

export default App;
