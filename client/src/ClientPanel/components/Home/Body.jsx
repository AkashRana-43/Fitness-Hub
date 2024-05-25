import React from 'react'
import Img1 from '../../assets/img/other/prog1.jpeg'
import Img2 from '../../assets/img/other/prog2.jpg'
import './css/Body.css'

const Body = () => {
    return (
        <section className="projects-section bg-light" id="projects">
            <div className="container px-4 px-lg-5">
                <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div className="col-xl-8 col-lg-7">
                        <img className="img-fluid mb-3 mb-lg-0" src={Img1} alt="..." />
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="featured-text text-center text-lg-left">
                            <h4>Health is Wealth</h4>
                            <p className="text-black-50 mb-0" style={{ textAlign: 'justify' }}>By embracing fitness, we invest in ourselves, unlocking a wealth of vitality, confidence,
                                and joy. Joining this journey isn't just about sculpting bodies; it's about sculpting lives filled with energy and purpose.
                                Every workout is a deposit into our well-being bank, yielding returns in strength, resilience, and happiness.
                                So, let's lace up our shoes, step onto the fitness path, and claim our rightful wealth of health.</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div className="col-xl-4 col-lg-5">
                        <div className="featured-text text-center text-lg-left">
                            <h4>Connect Together</h4>
                            <p className="text-black-50 mb-0" style={{ textAlign: 'justify' }}> let's embrace this global connection, tapping into a world of expertise and support. Together,
                             we'll elevate our fitness goals, transcend limitations, and celebrate the boundless possibilities of unity in wellness. Here, you can discover trainers who resonate with
                              your goals, preferences, and personality, transcending borders and time zones. With the click of a button, you can connect with a trainer who inspires you, motivates you,
                               and guides you on your fitness journey.</p>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                        <img className="img-fluid mb-3 mb-lg-0" src={Img2} alt="..." />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Body