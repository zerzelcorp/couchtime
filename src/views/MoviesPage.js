import { Alert, Box, Button, ButtonGroup, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from 'styled-components';
import { Grid } from 'swiper';
import MovieCard from '../components/MovieCard';
import { useCounter } from '../hooks/useCounter';
import { useUrl } from '../hooks/useUrl';

const MoviesPage = () => {

    const {palette} = useTheme();
  
    const [endpnt, setEndpoint] = useState(`/discover/movie`);
  
    const [search,setSearch]=useState('');
  
    const { count: page, incCount, decCount, pageChange } = useCounter(1);
  
    const handleSearchChange=({target})=>{
        setSearch(target.value)      
        setEndpoint("/search/movie")
        setEndpoint('')
      // }else{
      //   setSearch('')
      //   setEndpoint("/discover/movie")
      // }
    }
  
    const ctrctFilters = (n, c, o) => {
        return 1
     };
  
//getting the data via custom hooks
const { res: data, loading, error } = useUrl(endpnt,page,search);
  
  
//   useEffect(()=>{
//   setSearch('')
//   },[])
  
  return (
    <>
    {data ? (
      <Box
        className="animate__animated animate__fadeIn"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ boxShadow: 2,height:"auto",mt: 4,maxWidth:"100%"}}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress/>      
          </Box>
        ) : (
          <>
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
        
      {/* Filters */}
      <Box
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
        mb:2,
        bgColor:palette.primary.light
      }}
      boxShadow={1}
      gap={2}
      p={2}
    >
      <FormControl variant="standard" sx={{ width: 100}}>
        <InputLabel>Sort by</InputLabel>
        <Select label="sortby">
          <MenuItem value={1} >+18</MenuItem>
          <MenuItem value={2} >Date</MenuItem>
          <MenuItem value={3} >Genre</MenuItem>
        </Select>
      </FormControl>
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
  )
}

export default MoviesPage;
