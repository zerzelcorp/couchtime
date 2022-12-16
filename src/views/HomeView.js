import {
  Box,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "animate.css";
import { Container } from "@mui/system";
import Sw from "../components/Sw";


export const HomeView = () => {

const { palette } = useTheme();

const [endp, setEndpoint] = useState(`/discover/movie`);
  
const [search, setSearch] = useState("");

// const endpoints = [
//     `/movie/top_rated`,
//     `/movie/popular`,
//     `/trending/movie/day`,
//     `/trending/movie/week`
//   ];

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
    // setEndpoint("/search/movie");
    // setEndpoint("");
    // }else{
    //   setSearch('')
    //   setEndpoint("/discover/movie")
    // }
  };

  return (
    <Container fixed className="animate__animated animate__fadeIn">
        <Box
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
            <Sw endpoint="/movie/popular" delayTime={2500} title="Popular"/>
            <Sw endpoint="/trending/movie/day" delayTime={3200} title="Trending Today"/>  
             <Sw endpoint="/movie/upcoming" delayTime={3000} title="Upcoming"/>      
          </Box>
        </Box>
    </Container>
  );
};
