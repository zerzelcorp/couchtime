import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Grid,
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useCounter } from "../hooks/useCounter";
import { useUrl } from "../hooks/useUrl";
import { Link } from "react-router-dom";
import axios from "axios";
import { SearchOutlined, SearchRounded } from "@mui/icons-material";

// const btnTitles = ['In Theatres','Top Rated','Popular','Week','Latests']
// const btnEndpoints = [`/movie/now_playing`,`/movie/top_rated`,`/movie/popular`,`/trending/movie/week`,`/movie/now_playing`]

const MoviesView = () => {
  const [endpoint, setEndpoint] = useState(`/discover/movie`);
  const [genres,setGenres]=useState([])
  const [search, setSearch] = useState("");
  const [sort,setSort]=useState('')
  const { count: page, incCount, decCount, pageChange } = useCounter(1);

  const handleSearchChange = (e) => {
    if(e.target.value){
      setSearch(e.target.value);
      setEndpoint(...endpoint,"/search/movie");
    }else{
      setEndpoint(endpoint);
    }
  };

const handleSortChange=(e)=>{
  setSort(e.target.value)
}

//getting the data via custom hooks
const { res: data, loading, error } = useUrl(endpoint,page,search);

//getting genre list
// const {res} = useUrl(`/genre/movie/list`);

useEffect(() => {
   axios.get(`${process.env.REACT_APP_URL_BASE}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
   .then(genres=>setGenres(genres.data.genres))
  }, [genres])

  return (
    <>
      {data ? (
        <Box
          className="animate__animated animate__fadeIn"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ boxShadow: 2, height: "auto", mt: 4, maxWidth: "100%" }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Filters */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection:{xs:"column",md:"row"},
                  mb: 1,
                }}
                boxShadow={1}
                gap={2}
                p={2}
              >
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="sortbygenre">Sort By Genre:</InputLabel>
                  <Select labelId="sortbygenre" label="sortby" value={sort} onChange={handleSortChange}>
                    {
                      genres.map(genre=>(
                        <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                      ))
                    } 
                  <MenuItem  value="act">act</MenuItem>
                  </Select>
                </FormControl>

                <ButtonGroup variant="outlined">
                  <Button onClick={()=>{setEndpoint(`/movie/now_playing`)}}> In Theatres</Button>
                  <Button onClick={()=>{setEndpoint(`/movie/top_rated`)}}>Top Rated</Button>
                  <Button onClick={()=>{setEndpoint(`/movie/popular`)}}>Popular</Button>
                  <Button onClick={()=>{setEndpoint(`/trending/movie/week`)}}>Week</Button>
                  <Button onClick={()=>{setEndpoint(`/movie/now_playing`)}}>Latest</Button>          
                </ButtonGroup>

                <TextField
                  value={search}
                  onChange={handleSearchChange}
                  sx={{ width: "100%" }}
                  label="Search"
                  variant="standard"
                  // endAdornment={<InputAdornment position="end">
                  //      <SearchRounded color="text.primary"/>
                  //   </InputAdornment>
                  //   }
                />
              </Box>
              {/* nxt adn prev page btns */}
              <Box alignSelf="center" mb={2} mt={1}>
                <ButtonGroup variant="outlined">
                  <Button onClick={decCount}>Prev</Button>
                   <Button>{page}</Button>
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
        </Box>
      ) : (
        <Alert severity="error">error{error}</Alert>
      )}
    </>
  );
};

export default MoviesView;
