import { Autocomplete, Box, TextField } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box color="secondary">
      {/* <Autocomplete
      disablePortal
      sx={{width: 100}}
      /> */}
      <TextField sx={{width:"100%"}} label="Search" variant="standard"/>
    </Box>
  )
}

export default Header
