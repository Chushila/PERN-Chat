import React from 'react'
import { useSelector } from 'react-redux'
import OpenConversation from './OpenConversation'
import SideBar from './Sidebar'

export default function Dashboard({socket}) {
    const ifSelected = useSelector(state=>state.user.selectedConversation)
  return (
    <div className = 'd-flex' style = {{height:'100vh'}}> 
      <SideBar/>
      {ifSelected && <OpenConversation socket={socket}/>}
    </div>
  )
}
