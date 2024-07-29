import { ChevronRightRounded, ExpandMoreRounded } from "@mui/icons-material";
import {
  Box,
  Collapse,
  DialogTitle,
  IconButton,
  ListSubheader,
  Drawer as MuiDrawer,
  Stack,
  styled,
} from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import MenuItem from "./MenuItem";

const drawerWidth = "20vw";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `5vw`,
  [theme.breakpoints.up("sm")]: {
    width: `5vw`,
  },
});

const DrawerHeader = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "20px 0 8px 28px",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ open, setOpen }) {
  const [collapse, setCollapse] = useState(true);

  const menuItems = [
    {
      name: "Sustainable Destinations",
      linkName: "/destinations",
      icon: "url(https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-dashboard.svg) center center / contain no-repeat",
    },
    {
      name: "Travel Posts",
      linkName: "/forums",
      icon: "url(https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-booking.svg) center center / contain no-repeat",
    },
    {
      name: "Courses",
      linkName: "/generate/course",
      icon: "url(https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-course.svg) center center / contain no-repeat",
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            size="small"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              outline: "0px",
              margin: "0px",
              cursor: "pointer",
              userSelect: "none",
              verticalAlign: "middle",
              appearance: "none",
              textDecoration: "none",
              textAlign: "center",
              flex: "0 0 auto",
              borderRadius: "50%",
              overflow: "visible",
              border: "1px solid rgba(145, 158, 171, 0.12)",
              backgroundColor: (theme) => theme.palette.background.default,
              padding: "4px",
              zIndex: 9999,
              position: "fixed",
              top: "24px",
              left: open ? "20vw" : "5vw",
              transform: "translateX(-50%)",
              transition: "left 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(145, 158, 171, 0.08)",
              },
            }}
          >
            {open ? (
              <ChevronLeftIcon width={16} height={16} />
            ) : (
              <ChevronRightIcon width={16} height={16} />
            )}
          </IconButton>
        </DrawerHeader>
        <Scrollbars
          autoHide
          style={{ border: 0, outline: 0 }}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "#39454f",
                borderRadius: 3,
                height: "100%",
                outline: "none",
                border: "none",
              }}
            />
          )}
        >
          <Stack sx={{ mx: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ListSubheader
                onClick={() => setCollapse(!collapse)}
                disableSticky
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#637381",
                  textTransform: "uppercase",
                  fontSize: "0.6875rem",
                  cursor: "pointer",
                  lineHeight: 1.5,
                  fontWeight: 700,
                  padding: (theme) => theme.spacing(2, 1, 1, 0),
                  marginLeft: -1,
                  transition:
                    "color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover": {
                    color: "white",
                    paddingLeft: "4px",
                    "& .chevron-icon": {
                      opacity: 1,
                    },
                  },
                }}
              >
                {collapse ? (
                  <ExpandMoreRounded
                    className="chevron-icon"
                    sx={{
                      opacity: 0,
                      transition:
                        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    }}
                    fontSize="small"
                  />
                ) : (
                  <ChevronRightRounded
                    className="chevron-icon"
                    sx={{
                      opacity: 0,
                      transition:
                        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    }}
                    fontSize="small"
                  />
                )}
                Overview
              </ListSubheader>
              <Collapse in={collapse}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      linkName={item.linkName}
                      name={item.name}
                      icon={item.icon}
                    />
                  ))}
                </Box>
              </Collapse>
            </Box>
          </Stack>
        </Scrollbars>
      </Drawer>
    </Box>
  );
}
