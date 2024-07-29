import { CalendarMonth, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Divider,
  FormControl,
  Grid,
  Grow,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { ListOrdered, Puzzle, School } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "./noImage.png";
import { getForumById, getAllForum } from "../services/forum-service";
import CreatePost from "../components/CreatePost";
import { Stack } from "@mui/system";

const SkeletonLoader = () => (
  <Container>
    <Box sx={{ mb: 7 }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ borderRadius: "16px", mb: 4 }}
      />
      <Typography variant="h3">
        <Skeleton type="text" width="50%" gutterBottom />
      </Typography>
      <Typography>
        <Skeleton type="text" width="80%" gutterBottom />
      </Typography>
    </Box>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="body2">
              <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            </Typography>
            <Typography>
              <Skeleton
                variant="text"
                width="90%"
                sx={{ mb: 3, fontSize: "0.875rem" }}
              />
            </Typography>
            <Typography variant="body2">
              <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            </Typography>
            <Typography>
              <Skeleton
                variant="text"
                width="90%"
                sx={{ mb: 3, fontSize: "0.875rem" }}
              />
            </Typography>
            <Typography variant="body2">
              <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            </Typography>
            <Typography>
              <Skeleton
                variant="text"
                width="90%"
                sx={{ mb: 3, fontSize: "0.875rem" }}
              />
            </Typography>
            <Typography variant="body2">
              <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            </Typography>
            <Typography>
              <Skeleton
                variant="text"
                width="90%"
                sx={{ mb: 3, fontSize: "0.875rem" }}
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: "16px", mb: 3 }}
        />
      </Grid>
    </Grid>
  </Container>
);

const ForumDetails = () => {
  const { forumId } = useParams();
  const [forum, setForum] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchForum = async () => {
      setLoading(true);

      try {
        const forum = await getForumById(forumId);
        const posts = await getAllForum();

        console.log(forum);
        setPosts(posts.forum.slice(0, 5));
        console.log(posts);
        setForum(forum.forum);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchForum();
  }, []); // eslint-disable-line

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div>
          {forum.length !== 0 && (
            <Container>
              <Box sx={{ position: "relative", mb: 3 }}>
                <img
                  src={noImage}
                  alt="Studyset Cover"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    filter: "brightness(60%)",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    mt: 6,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",

                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <div>
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        sx={{ color: "white" }}
                      >
                        {forum.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {forum.description}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Box>
              <Grid
                container
                spacing={4}
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid item xs={12} md={4}>
                  <Grow in>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: "4px",
                            }}
                          >
                            <CalendarMonth />

                            <Typography
                              variant="body2"
                              fontSize="0.875rem"
                              color="#919EAB"
                              sx={{ ml: 1 }}
                            >
                              Date Posted
                            </Typography>
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              ml: 4,
                              mb: 2,
                            }}
                          >
                            {moment(forum.createdAt).format("MMMM Do, YYYY")}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: "4px",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-user-pen"
                            >
                              <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                              <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                              <circle cx="10" cy="7" r="4" />
                            </svg>

                            <Typography
                              variant="body2"
                              fontSize="0.875rem"
                              color="#919EAB"
                              sx={{ ml: 1 }}
                            >
                              Created by
                            </Typography>
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              ml: 4,
                              mb: 2,
                            }}
                          >
                            {forum.createdBy}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={3}>
                    {posts?.map((post, index) => (
                      <Card sx={{ display: "flex" }}>
                        <CardMedia
                          alt="post"
                          component="image"
                          image={noImage}
                          sx={{ width: 151 }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography variant="h5">{post.title}</Typography>
                            <Typography variant="subtitl">
                              {post.description}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default ForumDetails;
