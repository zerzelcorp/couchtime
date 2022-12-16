import React, { useState } from "react";
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
  Breadcrumbs,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useCounter } from "../hooks/useCounter";
import { useUrl } from "../hooks/useUrl";
import { Link } from "react-router-dom";

const SeriesPage = () => {
  const [endpnt, setEndpoint] = useState(`/discover/tv`);

  const [search, setSearch] = useState("");

  const { count: page, incCount, decCount, pageChange } = useCounter(1);

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
    setEndpoint("/search/tv");
  };

  const ctrctFilters = (n, c, o) => {
    return 1;
  };

  //getting the data via custom hooks
  const { res: data, loading, error } = useUrl(endpnt, page, search);

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
            <Breadcrumbs sx={{mb:2}}>
            <Link to="/" style={{color:"gray",textDecoration:"none"}}>
            <Typography variant="h3">Home</Typography>
            </Link>
            <Link to="/series" style={{color:"white",textDecoration:"none"}}>
              <Typography variant="h3">Series</Typography>
            </Link>
            </Breadcrumbs>
              {/* Filters */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  mb: 2,
                }}
                boxShadow={1}
                gap={2}
                p={2}
              >
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select label="sortby">
                    <MenuItem value={1}>+18</MenuItem>
                    <MenuItem value={2}>Date</MenuItem>
                    <MenuItem value={3}>Genre</MenuItem>
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
                <TextField
                  value={search}
                  onChange={handleSearchChange}
                  sx={{ width: "100%" }}
                  label="Search"
                  variant="standard"
                />
              </Box>
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
        </Box>
      ) : (
        <Alert severity="error">error{error}</Alert>
      )}
    </>
  );
};

export default SeriesPage;