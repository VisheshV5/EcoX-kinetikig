import { Icon } from "@iconify/react/dist/iconify.js";
import {
  MoreVert,
  TipsAndUpdates,
  TipsAndUpdatesOutlined,
} from "@mui/icons-material";
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
// import noImage from "./images/noImage.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function DestinationCard({ destination }) {
  const [delLoading, setDelLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  const [owner, setOwner] = useState(false);
  const [check, setCheck] = useState(undefined);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grow in>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            position: "relative",
            width: 350,
            height: "50vh",
          }}
        >
          <CardMedia
            component="img"
            image={destination.image}
            alt={destination.description}
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
                  <TipsAndUpdatesOutlined
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

                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "30px",
                    fontWeight: 800,
                    mt: -1,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontFamily: "Marvel",

                    textOverflow: "ellipsis",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {destination.title.toUpperCase()}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {destination.description}
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
        <a href="https://plainenglish.io/blog" target="_blank" rel="noreferrer">
          <MenuItem onClick={() => navigate(`${destination.link}`)}>
            <Icon icon="solar:file-text-bold" width="24" height="24" />
            View
          </MenuItem>
        </a>

        {/* <Divider sx={{ borderStyle: "dashed" }} /> */}
      </Menu>
    </>
  );
}
