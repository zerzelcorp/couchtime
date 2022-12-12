import { Button, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import useChange from '../hooks/useChange'

const SignUp = () => {

const {formval,handleNameChange,handlePasswordChange}=useChange({name:'',password:''})
 
const handleSingUp=({e})=>{
    e.preventDefault()
    console.log("yay")
 }

return (
    <Box component="form" display="flex" width={100} border={1}>
      <Typography>SignUp</Typography>

      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" aria-describedby="insert-name" onChange={handleNameChange}/>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="passsword">Password</InputLabel>
        <Input id="password" aria-describedby="insert-name" onChange={handlePasswordChange}/>
      </FormControl>

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSingUp}>
          Send
        </Button>
    </Box>
  )
}

export default SignUp
