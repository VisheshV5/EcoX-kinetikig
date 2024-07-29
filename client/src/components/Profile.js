import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Checkbox,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import React from "react";

import ProfileItem from "./ProfileItem";
import { logout } from "../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const customIcon = (
  <Box
    sx={{
      borderRadius: 1,
      margin: "2px",
      width: 18,
      height: 18,
      border: "1.5px solid #919EAB",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
    }}
  />
);

export default function Profile({
  open,
  setOpen,
  filterValues,
  setFilterValues,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Home",
      linkName: "/dashboard",
    },
    {
      name: "Profile",
    },
    {
      name: "Projects",
    },
    {
      name: "Subscription",
    },
    {
      name: "Security",
    },
    {
      name: "Account Settings",
    },
  ];
  return (
    <Drawer
      open={open}
      variant="temporary"
      anchor="right"
      elevation={16}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          position: "absolute",
          height: "100%",
          width: "320px",
          outline: "0px",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(28, 37, 46, 0.9)",
          backgroundImage:
            "url(./components/images/redBlur.png), url(./components/images/cyan-blur.png)",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "right top, left bottom",
          boxShadow: "-40px 40px 80px -8px rgba(0 0 0 / 0.24)",
          backgroundSize: "50%, 50%",
        },
      }}
    >
      <IconButton
        sx={{ flex: "0 0 auto", m: 2, marginRight: "auto" }}
        onClick={() => setOpen(false)}
      >
        <Icon icon="mingcute:close-line" width="20" height="20" />
      </IconButton>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/mock/assets/images/avatar/avatar-25.webp"
          style={{
            width: "40%",
            borderRadius: 99,
            objectFit: "contain",
          }}
        />
        <Typography variant="h6" sx={{ mt: 1 }} fontWeight={600}>
          Vishesh Verma
        </Typography>
        <Divider
          sx={{
            width: "110%",
            mt: 3,
            borderStyle: "dashed",
            mx: -5,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            py: 2,
          }}
        >
          {menuItems.map((item, index) => (
            <ProfileItem
              key={index}
              linkName={item.linkName}
              name={item.name}
              icon={item.icon}
            />
          ))}
        </Box>
        <Divider
          sx={{
            width: "110%",
            mt: 3,
            borderStyle: "dashed",
            mx: -5,
          }}
        />
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 3 }}>
          <Button
            sx={{
              position: "absolute",
              bottom: 0,
              mb: 2,
              width: "85%",
              py: 2,
              fontWeight: 700,
              color: "#FF0000",
              backgroundColor: "#FF000033",
              "&:hover": {
                backgroundColor: "#FF00004D",
              },
            }}
            onClick={() => {
              dispatch(logout());
              setOpen(false);
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
