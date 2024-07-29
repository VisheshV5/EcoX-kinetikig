import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createForum } from "../services/forum-service";
import { toast } from "react-toastify";

const CreatePost = ({ open, onClose, onCreate, groupId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleImagesChange = (event) => {
    if (event.target.files.length > 0) {
      setImages(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      // toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const createdPost = await createForum(user.id, {
        title,
        description,
        location,
        user,
      });
      const errorCheck = createdPost;
      console.log(errorCheck.error);
      if (errorCheck.error) {
        toast.error("Post about sustainable travel");
      } else {
        console.log("nigga bounce");
        toast.success("Post created!");
        window.location.reload();
        onClose();
      }
    } catch (err) {
      console.error(err);
      // toast.error("Failed to create post. " + err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>
          <Typography variant="body2" gutterBottom>
            Title, description, images...
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label="Title"
              placeholder="Ex: Amazing Vacation..."
              value={title}
              onChange={handleTitleChange}
              fullWidth
              required
            />
            <TextField
              label="Location"
              placeholder="Ex: New York"
              value={location}
              onChange={handleLocationChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              placeholder="Write something interesting..."
              value={description}
              onChange={handleDescriptionChange}
              fullWidth
              multiline
              rows={4}
            />
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImagesChange}
                multiple={false}
              />
            </Button>
            {images.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                {images.map((image, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body2">{image.name}</Typography>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview ${index}`}
                      style={{
                        width: "100%",
                        maxHeight: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
