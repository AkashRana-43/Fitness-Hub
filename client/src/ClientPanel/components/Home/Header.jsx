import React from 'react'
import { Container } from "reactstrap";

const Header = () => {
    return (
        <>
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require('../../assets/img/bg/BG.jpg') + ")",
                }}
            >
                <div className="filter" />
                <div className="content-center">
                    <Container>
                        <div className="title-brand">
                            <h1 className="presentation-title"><span className='title-front'>FIT</span>ness <br/> <span className='title-front'>HUB</span></h1>
                        </div>
                        <h2 className="presentation-subtitle text-center">
                            Make your mark with a Free Bootstrap 4 (Reactstrap) UI Kit!
                        </h2>
                    </Container>
                </div>
                {/* <h6 className="category category-absolute">
                    
                </h6> */}
            </div>
        </>

    )
}

export default Header