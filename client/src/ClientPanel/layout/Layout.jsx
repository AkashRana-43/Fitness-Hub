import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const Layout = ({children}) => {
  return (
    <>
        <Navbar/>
        <div>{children}</div>
        <Footer/>
    </>
  )
}

export default Layout