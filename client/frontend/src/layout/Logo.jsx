import React from 'react'
import userImage from '../assets/avatar.jpg'
import {Avatar} from 'antd'
export const Logo = () => {
  const AppUserData="AppUserData"
    const userData= JSON.parse(localStorage.getItem(AppUserData))

    const Name = "Admin"
  return (
    <div style={{ display: 'flex', flexDirection:"column" ,alignItems: 'center', padding: '26px' }}>
    <Avatar size={60} src={userImage} />
    <span style={{ color: 'white' ,marginTop:"9px",fontSize:"22px",color:"3011627"}}>{userData.username}</span>
  </div>
  )
}
