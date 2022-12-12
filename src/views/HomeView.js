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
import React, { useEffect, useState } from "react";
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

export const HomeView = () => {
  const { palette } = useTheme();

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
    <>
        <Box
          className="animate__animated animate__fadeIn"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ boxShadow: 2, height: "auto", mt: 4, maxWidth: "100%" }}
        >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4 }}
                className="animate__animated animate__fadeInLeft"
              >
                <img
                  style={{ height: "40px", width: "30px", marginRight: "8px" }}
                  alt="logo"
                  src="poplogo.png"
                />
                <Typography
                  variant="title"
                  component="h1"
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    mt: 1,
                    bgColor: "primary.light",
                  }}
                >
                  CouchTime
                </Typography>
              </Box>
              <TextField
               value={search}
                onChange={handleSearchChange}
                variant="filled"
                sx={{ width: { sm: "100%", md: "30%" }, mb: 3 }}
                label="Search"
              />
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
              <Sw endpoint="/movie/popular"/>
              <Typography variant="h2" color="text.secondary" sx={{mb:2,mt:3}}>
                Trending Today
                </Typography>
              <Sw endpoint="/trending/movie/day"/>  
              <Typography variant="h2" color="text.secondary" sx={{mb:2,mt:3}}>
                Upcoming
                </Typography>
             <Sw endpoint="/movie/upcoming"/>      
          </Box>
        </Box>
    </>
  );
};
