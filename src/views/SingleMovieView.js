import { FavoriteOutlined } from "@mui/icons-material";
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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUrl } from "../hooks/useUrl";

const SingleMovieView = () => {
  const { movieId } = useParams();
  const [fav, setFav] = useState(false)

  const { res: data, loading, error } = useUrl(`/movie/${movieId}`, 1);

  console.log(data.genres);
console.log(fav)
  useEffect(() => {
    return cleanup();
  }, [data]);

  return (
    <Container fixed className="animate__animated animate__fadeIn">
      {error ? (
        <Alert severity="error">An Error Ocurred</Alert>
      ) : data ? (
        <Box sx={{ p: 2, m: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">
              <Typography color="text.primary" underline="hover">
                Home
              </Typography>
            </Link>
            <Typography color="text.primary" underline="hover">
              {data.title}
            </Typography>
          </Breadcrumbs>

          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Box sx={{ mb:2,display: "flex",gap:2,alignItems:"baseline"}}>
              <Typography variant="h4">{data.title}</Typography>
                <Typography>{moment(data.release_date).format("LL")}</Typography>      
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
                <Divider/>
                <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                  {/* <Typography sx={{ mb: 2 }}>Description:</Typography> */}
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {data.overview}
                  </Typography>
                </Paper>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              sx={{ maxHeight: "400px", width: "100%" }}
            />
          <CardActions>
              <IconButton onClick={()=>setFav(!fav)}>
                <FavoriteOutlined sx={{
                  bgColor:fav?"success.main":"text.secondary"
                }}/>
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      ) : (
        <CircularProgress aria-describedby="loading" aria-busy={true} />
      )}
    </Container>
  );
};

export default SingleMovieView;
