import React from 'react'
import './styles/Program.css'
import program_1 from '../assets/program1.jpg'
import program_2 from '../assets/program2.webp'
import program_3 from '../assets/program3.jpg'
import { Box, Stack, styled, Typography} from '@mui/material'

const Program = () => {

    const StyledBox = styled(Box)({
        height: 200,
        width: '100%',
        cursor: 'pointer',
    })

    const StyledTypography = styled(Typography)({
        margin: '25% 50px 25% 50px',
        background: 'white',
        opacity: 0.8
    })

  return (
    <Box>
        <Stack 
            direction={{xs: 'column', sm: 'row'}} 
            spacing={{xs: 1, sm:2, md: 4}} 
            mt={2}
            ml={2}
            mr={2}
        >
            <StyledBox sx={{
                backgroundImage: `url(${program_1})`,
                backgroundSize: 'cover',
                
            }}>
                <StyledTypography align='center' variant='h3'>
                    Trainer
                </StyledTypography>
            </StyledBox>
            <StyledBox sx={{backgroundImage: `url(${program_2})`}}>
                <StyledTypography align='center' variant='h3'>
                    Trainer
                </StyledTypography>
            </StyledBox>
            <StyledBox sx={{backgroundImage: `url(${program_3})`}}>
                <StyledTypography align='center' variant='h3'>
                    Trainer
                </StyledTypography>
            </StyledBox>
        </Stack>
    </Box>
  )
}

export default Program