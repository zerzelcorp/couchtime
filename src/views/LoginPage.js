import { FormatOverline } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LoginPage = () => {

const [token, setToken] = useState(null);

const [formval, setForm] = useState({name:'',password:''});

const ctx = useContext(AppContext)

const navigate= useNavigate()
// const [errs,setErrors]= useState('')
  
 const handleNameChange = (e) => {
    e.preventDefault();
    setForm({ ...formval,name: e.target.value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setForm({ ...formval,password: e.target.value });
  };

  const onSubmit = async () => {
    const tknreq = await axios.get(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=e62c23c6a89f44bb94e028fd9db54528`
    );
    const tkn = tknreq;
    if(tkn){        
        setToken(tkn);
        console.log("token",token.data)
        navigate({to:"/"})
    }else{
        console.log("err")
        navigate({to:"/auth"})
    }
  };

console.log(ctx)

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="center"
      justifyContent="center"
    >
    <Typography>Login</Typography>
    <Box component="form" elevation={2} sx={{p:2,display:"flex",flexDirection:"column",gap:2}}>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" aria-describedby="insert-name" onChange={handleNameChange}/>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="passsword">Password</InputLabel>
        <Input id="password" aria-describedby="insert-name" onChange={handlePasswordChange}/>
      </FormControl>

        <Button variant="contained" sx={{ mt: 2 }} onClick={onSubmit}>
          Send
        </Button>
    </Box>
</Box>
  );
};

export default LoginPage;
