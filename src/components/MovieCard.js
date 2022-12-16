import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Info, InfoOutlined, InfoRounded } from "@mui/icons-material";
import {Card,Grid,CardMedia,CardContent,CardActions,Avatar, CardHeader, IconButton, Modal, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import useOpen from "../hooks/useOpen";
import { Link, Navigate, useNavigate } from "react-router-dom";

const MovieCard = ({
  adult,
  release_date,
  id,
  popularity,
  vote_average,
  title,
  name,
  first_air_date,
  poster_path,
}) => {
let navigate= useNavigate()
  return (
  <Grid item xs={4} md={2} >
    {
      poster_path?
      (
    <Card key={id} elevation={2} className="animate__animated animate__fadeIn animate-delay-1s" >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor:
                vote_average > 6 ? "success.light" : "warning.light",
            }}
            aria-label="recipe"
          >
            {vote_average}
          </Avatar>
        }
        subheader={moment(release_date?release_date:first_air_date).format("LL")
      } 
      />
      <CardMedia
        component="img"
        sx={{maxHeight:"auto"}}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title?title:name}
        title={title?title:name}
      />
    
    <Button 
        onClick={()=>navigate(`/${id}`)}
        startIcon={<InfoRounded/>}
        >
        <Typography>More Info</Typography>
   </Button>

      <CardContent>     
        <Box md={{ display: "flex", columnGap: 3 }}>
          <Typography gutterBottom component="h6" variant="h6">          
            {title?title:name}
          </Typography> 
        </Box>
      </CardContent> 
    </Card> 
      )
      :(
<Skeleton variant="rectangular" width={300} height={300}></Skeleton>
      )
    }
  </Grid>
  );
};

export default MovieCard;
