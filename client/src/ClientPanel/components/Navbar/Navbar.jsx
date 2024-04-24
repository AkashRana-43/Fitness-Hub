import React from 'react'

const NavbarMain = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navigation fixed-top" id="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        <h2 className="text-white text-capitalize"><i>Gym</i><span className="text-color">Fit</span></h2>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsid"
                        aria-controls="navbarsid" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="ti-view-list"></span>
                    </button>
                    <div className="collapse text-center navbar-collapse" id="navbarsid">
                        <ul className="navbar-nav mx-auto">

                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Home </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="service.html">Join Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pricing.html">LogIN</a>
                            </li>

                        </ul>
                        <div className="my-md-0 ml-lg-4 mt-4 mt-lg-0 ml-auto text-lg-right mb-3 mb-lg-0">
                            <a href="/" style={{ textDecoration: 'none' }}> 
                                <h3 className="text-color mb-0">Login</h3>
                            </a>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarMain