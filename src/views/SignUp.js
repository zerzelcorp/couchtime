import { Button, Container, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useChange from '../hooks/useChange'

const SignUp = () => {

let navigate=useNavigate()

const {formval,handleNameChange,handlePasswordChange}=useChange({name:'',password:''})

let rtoken;

const url_token=`${process.env.REACT_APP_URL_BASE}authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
const urlsession=`${process.env.REACT_APP_URL_BASE}authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}&request_token=${rtoken}`
 
 const handleSingUp = () => {
   axios.get(url_token).then(rtoken=>{
    if(rtoken){
      axios.post(urlsession,rtoken.data.request_token)
    }else{
      console.log("token null")
    }
  }).then(success=>{
    console.log("user session succesfull",success)
    navigate("/")
  })
};

return (
  <Container sx={{display:"flex",mt:5,alignItems:"center",justifyContent:"center"}}>
     <Box
  display="flex"
  flexDirection="column"
  gap={2}
  alignItems="center"
  justifyContent="center"
  border={1}
  sx={{mt:5,p:2}}
>
<Typography>SignUp</Typography>
<Box component="form" elevation={2} sx={{p:2,display:"flex",flexDirection:"column",gap:2}}>
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
     </Box>
  </Container>
  )
}

export default SignUp
