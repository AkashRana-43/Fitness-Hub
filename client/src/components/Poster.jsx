import React from 'react'
import './styles/Poster.css'

const Poster = (props) => {
    return (
        <>
            <div className={props.cName}>
                <img src={props.posterImg} alt='' />
                <div className="poster-title">
                    {/* <h1>{props.title}</h1>
                    <a href='/' className='button'> Join Us</a> */}
                </div>
            </div>
        </>
    )
}

export default Poster