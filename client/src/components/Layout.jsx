import React from 'react'
import Navbar from './Navbar.jsx'

const Layout = ({children}) => {
  return (
    <>
        <Navbar />
        <div>{children}</div>
    </>
  )
}

export default Layout