import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: `Indian Driving License Test` },
    headers: {
      "X-RapidAPI-Key": "b51b23820amshf9bcf39e47d7b4dp1732f4jsnc849a2cd8462",
      "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        {!videos ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          videos.slice(1, 4).map((video) => (
            <Grid item xs={12} md={6} lg={4} key={video.id}>
              <Card>
                <CardMedia
                  component="iframe"
                  height="240"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                />
                <CardContent>
                  <Typography className="zero-line-ellipsis" variant="h6" component="div">
                    {video.title}
                  </Typography>
                  <Typography className="one-line-ellipsis" variant="body2" color="text.secondary">
                    {video.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Video;
