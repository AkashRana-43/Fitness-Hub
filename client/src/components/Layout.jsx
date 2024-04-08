import React, { useState } from 'react'
import Navbar from './Navbar.jsx'

const Layout = ({children}) => {

  const [showLoginForm, setShowLoginForm] = useState(true);

    function toggleFormState() {
        setShowLoginForm(!showLoginForm);
    }

  return (
    <>
        <Navbar toggleFormState = {toggleFormState}/>
        <div>{children}</div>
    </>
  )
}

export default Layout