import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from './Sidebar'

export default function Dashboard() {
    const user = useSelector(state=>state.user.id)
  return (
    <div className = 'd-flex' style = {{height:'100vh'}}> 
      <SideBar/>
    </div>
  )
}
