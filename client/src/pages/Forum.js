import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Autocomplete,
  Box,
  Badge,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupCard from "../components/GroupCard";
import { FilterList, KeyboardArrowDown, Search } from "@mui/icons-material";

import noImage from "./noImage.png";
import { getAllForum } from "../services/forum-service";
import CreatePost from "../components/CreatePost";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [allForum, setAllForum] = useState();
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(9);
  const [filterValues, setFilterValues] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getForums = async () => {
      try {
        const forum = await getAllForum();
        console.log("FDJIOFDJIOFD", forum);
        setAllForum(forum.forum.reverse());
      } catch (err) {
        console.log(err);
      }
    };

    getForums();
  }, []);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(allForum?.length / groupsPerPage);
  const currentGroups = allForum?.slice(
    (page - 1) * groupsPerPage,
    page * groupsPerPage
  );

  return (
    <Container>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 3,
        }}
      >
        <Autocomplete
          freeSolo
          options={searchOptions}
          getOptionLabel={(option) => option.title || ""}
          inputValue={searchTerm}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          sx={{ marginRight: "auto", width: "35%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Search"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              helperText={searchTerm ? "" : "Please enter keywords"}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <img
                src={noImage}
                alt=""
                width="40"
                height="40"
                style={{ marginRight: 10 }}
              />
              {option.title}
            </Box>
          )}
        />
        <Grid
          justifyContent="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ mr: 1 }}
              onClick={() => setDrawerOpen(true)}
              endIcon={
                <Badge
                  color="error"
                  overlap="circular"
                  variant="dot"
                  invisible={true}
                >
                  <FilterList />
                </Badge>
              }
            >
              Filters
            </Button>

            <FormControl size="small">
              <Select
                sx={{
                  "& fieldset": { border: "none" },
                  "&:hover": {
                    transition:
                      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
                defaultValue="Latest"
                renderValue={(value) => (
                  <Box sx={{ mr: "6px", fontWeight: 600 }} fontSize="14px">
                    Sort by: {value}
                  </Box>
                )}
                IconComponent={(props) => {
                  return <KeyboardArrowDown fontSize="small" {...props} />;
                }}
              >
                <MenuItem value="Latest">Latest</MenuItem>
                <MenuItem value="Oldest">Oldest</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={handleOpenDialog}
            >
              Create Post
            </Button>
            <CreatePost open={dialogOpen} onClose={handleCloseDialog} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {currentGroups?.map((group) => (
          <Grid item key={group.id} xs={12} sm={6} md={4}>
            <GroupCard group={group} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Container>
  );
};

export default Forum;
