import React from 'react'
import Img1 from '../../assets/img/bg/BG.jpg';

const AboutHeader = () => {
    return (
        <section className="card-body p-0">
            <div className='cover-pic'>
                <img src={Img1} alt="" className="img-fluid" />
            </div>
        </section>
    )
}

export default AboutHeader