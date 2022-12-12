import { Typography} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system'
import React from 'react'

const Footer = () => {
    const theme = useTheme()
  return (
    <Box sx={{
    maxWidth:"100%",
    height:"200px",
    mt:3,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    bgColor:theme.palette.background.paper

    }}>
      <Typography variant="h5">Made By Matias Montiel</Typography>
    </Box>
  )
}

export default Footer
