import React from 'react'
import { Container } from "reactstrap";

const Header = () => {
    return (
        <>
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require('../../assets/img/bg/BGG.jpg') + ")",
                }}
            >
                <div className="filter" />
                <div className="content-center">
                    <Container>
                        <div className="title-brand">
                            <h1 className="presentation-title"><span className='title-front'>FITNESS </span><br/> <span className='title-front'>HUB</span></h1>
                        </div>
                        <h2 className="presentation-subtitle text-center">
                            "Through every lift and every stride, the bond between trainer and gym lover grows stronger, forging a path of strength and determination."
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