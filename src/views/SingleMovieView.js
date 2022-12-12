import React, { useEffect, useState } from "react";
import { ArrowForward, FavoriteBorder, FavoriteOutlined, LanguageRounded } from "@mui/icons-material";
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
} from "@mui/material";
import { Box } from "@mui/system";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import moment from "moment";
import { useUrl} from "../hooks/useUrl";
import { useParams,Link, NavLink } from "react-router-dom";

const SingleMovieView = () => {

  const { movieId } = useParams();

  const [fav, setFav] = useState(false);

  const { res: data, loading, error } = useUrl(`/movie/${movieId}`, 1);


const handleFav=()=>{
  try {
    let account_id
    if(account_id){
      axios.post(`${process.env.REACT_APP_URL_BASE}/account/{account_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${"#"}&account_id=''`)
    }else{
      console.log("userid invalid")
    }
    console.log("added to list") 
  } catch (error) {
    console.log("you are not authenticated")
  }
}

  useEffect(() => {
    return cleanup();
  }, [data]);

  return (
    <Container className="animate__animated animate__fadeIn">
      {error ? (
        <Alert severity="error">An Error Ocurred</Alert>
      ) : loading ? (
        <Box
          sx={{ m: 4 }}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <CircularProgress aria-describedby="loading" aria-busy={true} />
        </Box>
      ) : (
        <Box sx={{ p: 2, m: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink to="/">
              <Typography color="text.primary" underline="hover">
                Home
              </Typography>
            </NavLink>
            <NavLink> 
            <Typography color="text.primary" underline="hover">
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
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">{data.title}</Typography>
                  <Typography>
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
                  <IconButton onClick={() => setFav(!fav)}>
                    {
                      fav?
                    <FavoriteBorder />:
                    <FavoriteOutlined
                      color="success"
                      />
                    }
                  </IconButton>
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
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, wordWrap: "normal" }}
                  >
                    {data.overview}
                  </Typography>
                </Paper>
                {/* OTHER INFO */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"flex-start",
                    flexflow: "column-wrap",
                 }}
                >
                  <Typography>Production Companies:</Typography>
                  <Box display="flex" gap={2} sx={{flexDirection:"center", mb: 3, mt: 2 }}>
                    {data.production_companies.map((p) => (
                      <Box
                        display="flex"
                        sx={{
                          flexFlow: "column-wrap",
                          flexDirection: { sm: "column", md: "row", l: "row" },
                        }}
                      >
                        <Chip key={p.id} label={p.name} />
                      </Box>
                    ))}
                  </Box>
                  <Divider variant="middle" />
                  <Typography sx={{ mb: 1, mt: 2 }}>Genres:</Typography>
                  <Box display="flex" sx={{ gap: 2 }}>
                    {data.genres.map((g) => (
                      <Chip key={g.id} label={g.name} />
                    ))}
                  </Box>
                  <Box sx={{mt:3}}>
                  {
                    data.homepage?(
                   <IconButton
                   startIcon={<LanguageRounded/>}
                   >
                    <a                
                     href={data.homepage}  
                     rel="noreferrer" 
                     target="_blank">
                      Website
                     </a>
                      </IconButton>
                     )
                    :''
                  }
                  </Box>
                </Box>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              sx={{ maxHeight: "500px", width: "100%" }}
            />
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default SingleMovieView;
