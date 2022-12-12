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
import { Outlet } from "react-router-dom";
import { Container } from "@mui/system";
import { cleanup } from "@testing-library/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper";

export const HomeView = () => {

  const {palette} = useTheme();
  
  const [endpnt, setEndpoint] = useState(`/discover/movie`);
  const [search,setSearch]=useState('');

  const { count: page, incCount, decCount, pageChange } = useCounter(1);

  //getting the data via custom hooks
  const { res: data, loading, error } = useUrl(endpnt,page,search);

  const handleSearchChange=({target})=>{
    setSearch(target.value)
  }
  //  const ctrctFilters = (n, c, o) => {
  //      setEndpoint(new Endpoint(n, c, o));
  //   };

  return (
    <Container fixed>
      {data ? (
        <Box
          className="animate__animated animate__fadeIn"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ p: 2, boxShadow: 2, height: "auto", mt: 4 }}
        >
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
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
                    mt: 3,
                    bgColor: "primary.light",
                  }}
                >
                  CouchTime
                </Typography>
              </Box>
             <TextField
             value={search}
             onChange={handleSearchChange}
             sx={{width:"100%"}} 
             label="Search" 
             variant="standard"/>
              <Divider />
          {/* nxt adn prev page btns */}
          <Box alignSelf="center" mb={2} mt={2}>
            <ButtonGroup variant="outlined">
              <Button onClick={decCount}>Prev</Button>
              <Button onClick={incCount}>Next</Button>
            </ButtonGroup>
          </Box>
          {/* MOVIES GRID */}
          <Grid
            container
            spacing={3}
            rowGap={1}
            justifyContent="center"
            alignContent="center"
          >
            {data.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </Grid>
            </>
          )}

          {/* Filters */}
          {/* <Box
        boxShadow={1}
        display="flex"
        gap={2}
        alignItems="center"
        justifyContent="center"
        p={2}
        sx={{ mb: 2 }}
      >
        <FormControl variant="standard" sx={{ width: 100 }}>
          <InputLabel>Sort by</InputLabel>
          <Select label="sortby">
            <MenuItem value={1} >+18</MenuItem>
            <MenuItem value={2} >Date</MenuItem>
            <MenuItem value={3} >Genre</MenuItem>
          </Select>
        </FormControl>}
        <ButtonGroup variant="contained">
          <Button onClick={ctrctFilters("movie", "now_playing")}>
            In Theatres
          </Button>
          <Button onClick={ctrctFilters("movie", "top_rated")}>
            Top Rated
          </Button>
          <Button>Popular</Button>
          <Button onClick={ctrctFilters("trending", "movie", "week")}>
            Week
          </Button> 
          <Button>Latest</Button>
        </ButtonGroup>
      </Box> */}
          {/* SWIPPER */}
          {/* <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data.map((movie) => (
              <SwiperSlide>
                <MovieCard key={movie.id} {...movie} />{" "}
              </SwiperSlide>
            ))}
          </Swiper> */}
        </Box>
      ) : (
        <Alert severity="error">error{error}</Alert>
      )}
    </Container>
  );
};
