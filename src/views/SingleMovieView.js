import React, { useContext, useEffect, useState } from "react";
import {
  BookmarkIcon,
  ArrowForward,
  FavoriteBorder,
  FavoriteOutlined,
  LanguageRounded,
  BookmarkAdd,
  BookmarkBorder,
  ClosedCaption
} from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Breadcrumbs,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Chip,
  Stack,
  Typography,
  List,
  ListItem,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import { useUrl } from "../hooks/useUrl";
import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { SwiperSlide } from "swiper/react";
import Swiper, { Autoplay } from "swiper";

const SingleMovieView = () => {

  const { movieId } = useParams();
  let navigate=useNavigate()
  const ctx = useContext(AppContext);

  const [fav, setFav] = useState(false);

  const [videos, setVideos] = useState([]);

  const [credits, setCredits] = useState([]);

  const [similars,setSimilar]=useState([]);

  const { res: data, loading, error } = useUrl(`/movie/${movieId}`, 1);

  const handleFav = () => {
    try {
      if (ctx.user.id) {
        let url = `${
          process.env.REACT_APP_URL_BASE
        }/account/${"#"}/favorite?api_key=${
          process.env.REACT_APP_API_KEY
        }&session_id=${ctx.user.id.data.guest_session_id}&account_id=''`;
        // axios({
        //   method: "post",
        //   url: url,
        //   data: {
        //     media_type:"movie",
        //     media_id: movieId,
        //     favorite: true,
        //   },
        //   headers: { "Content-type": "application/json" },
        // }).then((res) => {
        //   console.log("axios res", res);
        // });
        axios
          .post(
            url,
            { media_type: "movie", media_id: movieId, favorite: true },
            { headers: { "Content-type": "application/json" } }
          )
          .then((fv) => {
            setFav(!fav);
            console.log("added to list:", fv);
          });
      } else {
        setFav(false);
        console.log("no tkn provided");
      }
    } catch (error) {
      console.log("you are not authenticated");
    }
  };

  //  useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_URL_BASE}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
  //   .then(vds=>setVideos([vds.data]))

  //    console.log("movie vids",videos)
  //   // console.log("ctx sngl page",ctx.user)
  //  },[])

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_URL_BASE}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
  //     .then((cr) => {
  //       setCredits([cr]);
  //       console.log("credits", credits);
  //     });
  // },[credits]);

// useEffect(()=>{
//   axios.get(`${process.env.REACT_APP_URL_BASE}/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}`)
//   .then((sm) => {
//     setSimilar(sm);
//   });
// },[similars])

// console.log("similars",similars.data.results);

  return (
    <>
      {error ? (
        <Alert severity="error">An Error Ocurred</Alert>
      ) : loading ? (
        <Box
          sx={{ m: 4 }}
          display="flex"
          width="auto"
          justifyContent="center"
          alignContent="center"
        >
          <CircularProgress aria-describedby="loading" aria-busy={true} />
        </Box>
      ) : (
        <Box sx={{ p: 2, m: 2 }} className="animate__animated animate__fadeIn">
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink to="/" style={{ textDecoration: "none", color: "gray" }}>
              <Typography color="text.primary" underline="none">
                Home
              </Typography>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }}>
              <Typography underline="hover" color="text.primary">
                {data.title}
              </Typography>
            </NavLink>
          </Breadcrumbs>
          <Card
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                {/* //CARD HEADER */}
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4" sx={{ borderRight: 1, pr: 1 }}>
                      {data.title}
                    </Typography>

                    <Typography sx={{ borderRight: 1, pr: 1 }}>
                      {moment(data.release_date).format("LL")}
                    </Typography>

                    <Avatar
                      sx={{
                        bgcolor:
                          data.vote_average > 6
                            ? "success.light"
                            : "warning.light",
                      }}
                    >
                      {Math.floor(data.vote_average)}
                    </Avatar>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      flexDirection: "row",
                      border: 1,
                    }}
                  >
                    <IconButton onClick={handleFav}>
                      {fav ? (
                        <FavoriteOutlined color="success" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <Button sx={{ p: 1 }}>
                      {/* <BookmarkAdd/> */}
                      <BookmarkBorder />
                      <Typography component="small">
                        Save to watch list
                      </Typography>
                    </Button>
                  </Box>
                </Box>
                <Divider />
                {/* CARD BODY */}
                <Paper
                  elevation={1}
                  sx={{
                    display: "flex",
                    flexFlow: "column-wrap",
                    flexShrink: "4",
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, wordWrap: "normal", fontSize: 20 }}
                  >
                    {data.overview}
                  </Typography>
                </Paper>
                {/* OTHER INFO */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexflow: "column-wrap",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                    }}
                  >
                    {/* PRODUCTIONS COMPANIES */}
                    <Box>
                      <Typography>Production Companies:</Typography>
                      <Box
                        display="flex"
                        gap={2}
                        sx={{ flexDirection: "center", mb: 3, mt: 2 }}
                      >
                        {data.production_companies.map((p) => (
                          <Box
                           key={p.id}
                            display="flex"
                            sx={{
                              flexFlow: "column-wrap",
                              flexDirection: {
                                sm: "column",
                                md: "row",
                                l: "row",
                              },
                            }}
                          >
                            <Chip label={p.name} />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Typography>Cast</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexFlow: "row-wrap",
                          justifyContent: "center",
                        }}
                      >
                        {/* {credits.cast.map((cast_member) => (
                          <Chip key={cast_member.id} label={cast_member.name} />
                        ))} */}
                      </Box>
                    </Box>
                  </Box>

                  <Divider variant="middle" />

                  <Box maxWidth="100%">
                    <Typography sx={{ mb: 1, mt: 2 }}>Genres:</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2,
                      }}
                    >
                      {data.genres.map((g) => (
                        // <Button key={g.id}
                        // variant="contained"
                        // color="text.secondary">
                        //   {g.name}
                        // </Button>
                        <Chip key={g.id} label={g.name} sx={{ mb: 2 }} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              title={data.title}
              sx={{ maxHeight: "500px", width: "100%" }}
            />
          </Card> 
    {/* SWIPER SIMILARS */}

  </Box>
      )}
    </>
  );
};

export default SingleMovieView;
