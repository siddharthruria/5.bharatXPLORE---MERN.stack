import React, {createContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export const UserContext= createContext();

const UserProvider = () => {
  return (
    <div>UserContext</div>
  )
}

export default UserProvider