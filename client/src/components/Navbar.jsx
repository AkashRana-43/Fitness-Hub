import { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    useMediaQuery
} from "@mui/material";
import {
    Menu,
    Close,
} from "@mui/icons-material";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MenuItems } from './data/NavItems'
import FlexBetween from './FlexBetween';

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <FlexBetween
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 30px',
                boxShadow: '0 5px 15px 0 rgba(0, 0, 0, 0.25)',
                width: '95%',
                height: '80px',
                borderRadius: '13px',
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: '9999',
            }}
        >
            <FlexBetween>
                <Typography>
                    Fitness Hub
                </Typography>
            </FlexBetween>

            {isNonMobileScreens ? (
                <FlexBetween gap='2rem'>
                    {MenuItems.map((item, index) => {
                        return (
                            <Typography
                                fontWeight="bold"
                                fontSize="25px"
                                color="white"
                                onClick={() => navigate(item.url)}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                        transform: "scale(1.05)",
                                        textShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
                                    },
                                }}
                                key={index}
                            >
                                {item.title}
                            </Typography>
                        )
                    })
                    }
                    <Typography
                        padding= '.3rem 1.5rem'
                        backgroundColor="transparent"
                        color='#e54b26'
                        border='2px solid #e54b26'
                        outline='none'
                        borderRadius= '3rem'
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor:"#e54b26",
                                color:'#fff'
                            },
                        }}
                    >
                        Login
                    </Typography>
                    <Typography
                        padding= '.4rem 1.5rem'
                        backgroundColor="#e54b26"
                        color='white'
                        border='none'
                        outline='none'
                        borderRadius= '3rem'
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Join Us
                    </Typography>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {!isNonMobileScreens && isMobileMenuToggled && (

                <Box
                    position="absolute"
                    top="0"
                    left='0'
                    height="auto"
                    zIndex="10"
                    width="100%"
                    backgroundColor = "rgba(255, 255, 255, 0.1)"
                    backdropFilter = "blur(10px)"
                    padding= '80px 0 30px 0'
                    margin='0'
                    borderRadius= '13px'
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        gap="3rem"
                    >
                        {MenuItems.map((item, index) => {
                            return (
                                <Typography
                                    key={index}
                                    fontWeight="bold"
                                    fontSize="25px"
                                    color="white"
                                    onClick={() => navigate("/")}
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                            transform: "scale(1.05)",
                                            textShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
                                        },
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            )
                        })
                        }
                        <Typography
                        padding= '.3rem 1.5rem'
                        backgroundColor="transparent"
                        color='#e54b26'
                        border='2px solid #e54b26'
                        outline='none'
                        borderRadius= '3rem'
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor:"#e54b26",
                                color:'#fff'
                            },
                        }}
                    >
                        Login
                    </Typography>
                    <Typography
                        padding= '.4rem 1.5rem'
                        backgroundColor="#e54b26"
                        color='white'
                        border='none'
                        outline='none'
                        borderRadius= '3rem'
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        Join Us
                    </Typography>
                    </FlexBetween>
                </Box>
            )}


        </FlexBetween >
    )
}

export default Navbar