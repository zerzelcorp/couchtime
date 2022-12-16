import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useCounter } from "../hooks/useCounter";
import { useUrl } from "../hooks/useUrl";
import "animate.css";
import Header from "../components/Header";
import { Endpoint } from "../helpers/endpoint_class";
import { endpoints } from "../helpers/endpoints";
import { Container } from "@mui/system";
import { cleanup } from "@testing-library/react";
import Sw from "../components/Sw";
import { AppContext } from "../context/AppContext";

export const HomeView = () => {

const { palette } = useTheme();

const ctx = useContext(AppContext)

  // const [endpoints, setEndpoint] = useState(`/discover/movie`);
  
  const [search, setSearch] = useState("");

  const endpoints = [
    `/movie/top_rated`,
    `/movie/popular`,
    `/trending/movie/day`,
    `/trending/movie/week`
  ];

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
    // setEndpoint("/search/movie");
    // setEndpoint("");
    // }else{
    //   setSearch('')
    //   setEndpoint("/discover/movie")
    // }
  };

  const ctrctFilters = (n, c, o) => {
    return 1;
  };
  // useEffect(() => {
  //   setSearch("");
  // }, []);

  return (
    <Container fixed>
        <Box
          className="animate__animated animate__fadeIn"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ boxShadow: 2, height: "auto", mt: 4, maxWidth: "100%" }}
        >
          <Box sx={{display:"flex",width:"100%",justifyContent:"center"}}>
              <TextField
                value={search}
                onChange={handleSearchChange}
                variant="filled"
                sx={{ width: { sm: "100%", md: "30%" }, mb: 3 }}
                label="Search"
              />
          </Box>
              {/* SWIPPER */}
            <Box
                width="md"
                sx={{
                  display: "flex",
                  maxWidth:"100%",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
              
              {/* <Sw endpoint="/movie/top_rated"/> */}
              <Typography variant="h2" color="text.secondary" sx={{mb:2}}>
                Popular
                </Typography>
              <Sw endpoint="/movie/popular" delayTime={2500}/>
              <Typography variant="h2" color="text.secondary" sx={{mb:2,mt:3}}>
                Trending Today
                </Typography>
              <Sw endpoint="/trending/movie/day" delayTime={3200}/>  
              <Typography variant="h2" color="text.secondary" sx={{mb:2,mt:3}}>
                Upcoming
                </Typography>
             <Sw endpoint="/movie/upcoming" delayTime={3000}/>      
          </Box>
        </Box>
    </Container>
  );
};
