import React from 'react';
import Typography from '@mui/material/Typography';
import FlexBetween from './FlexBetween';
import { useNavigate } from "react-router-dom";
import './styles/Poster.css';

const Poster = (props) => {

    const navigate = useNavigate();

    const handleJoinUsClick = () => {
        navigate('/joinus');
    };

    return (
        <FlexBetween className="poster">
            <div className="poster-image" style={{
                backgroundImage: `url(${props.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'black',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: 700,
                width: '100%',
            }}>

            </div>
            <div className="poster-overlay">
                <div className="poster-text">
                    <Typography variant="h1">{props.title}</Typography>
                    <Typography variant="body1">{props.text}</Typography>
                    <Typography
                        backgroundColor="#e54b26"
                        width='120px'
                        height='40px'
                        color='white'
                        border='none'
                        outline='none'
                        borderRadius='3rem'
                        textAlign='center'
                        padding='7px 20px'
                        onClick={handleJoinUsClick}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Join Us
                    </Typography>
                </div>
            </div>
        </FlexBetween>
    )
}

export default Poster;
