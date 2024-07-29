import { Icon } from "@iconify/react/dist/iconify.js";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { CopyCheck, PencilLine } from "lucide-react";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function ForumCard({ group }) {
  const [delLoading, setDelLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  const [owner, setOwner] = useState(false);
  const [check, setCheck] = useState(undefined);

  return (
    <>
      <Grow in>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            position: "relative",
            mb: 3,
            height: "45vh",
          }}
        >
          <CardMedia
            component="img"
            image="https://static.vecteezy.com/system/resources/previews/021/053/686/original/background-banner-colorful-dark-green-gradation-striped-elegant-eps-10-free-vector.jpg"
            alt={group.description}
            sx={{
              width: "auto",
              margin: 1,
              borderRadius: 2,
              height: 151,
              filter: "brightness(60%)",
            }}
          />

          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "200px",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AutoAwesomeIcon
                    sx={{
                      fontSize: 20,
                      marginRight: 1,
                      color: "#00a76f",
                      fontWeight: 800,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#00a76f", fontWeight: 800 }}
                  >
                    Sustainable Travel
                  </Typography>
                </Box>
                <Typography variant="body2" color="#637381" gutterBottom>
                  Created {moment(group.createdAt).fromNow()}
                </Typography>

                <Typography
                  onClick={() => navigate(`/forum/${group._id}`)}
                  gutterBottom
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {group.title}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {group.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: 1,
              }}
            >
              <Tooltip title="More" arrow>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  size="small"
                  edge="end"
                >
                  <MoreVert />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grow>
      <Menu
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setConfirmDelete(false);
        }}
        open={Boolean(anchorEl)}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Icon icon="solar:file-text-bold" width="24" height="24" />
          View
        </MenuItem>
      </Menu>
    </>
  );
}
