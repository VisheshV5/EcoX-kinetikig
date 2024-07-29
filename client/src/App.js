import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { ColorModeContext } from "./common/components/ColorModeContext";
import Header from "./navbar/Header";
import MiniDrawer from "./sidebar/Sidebar";
import { clearMessage } from "./actions/message";
import Home from "./pages/Home";
import SustainableDestinations from "./pages/SustainableDestinations";
import CreateCourseCard from "./pages/course/Create";
import TakeCourse from "./pages/course/TakeCourse";
import Forum from "./pages/Forum";
import { ToastContainer } from "react-toastify";
import ForumDetails from "./pages/ForumDetails";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState("dark");
  const location = useLocation();
  const dispatch = useDispatch();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            darker: "#004B50",
            lighter: "#C8FAD6",
            dark: "#007867",
            main: "#00A76F",
            light: "#5BE49B",
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: "#8E33FF",
            light: "#C684FF",
            dark: "#5119B7",
            contrastText: "#FFFFFF",
          },
          error: {
            light: "#FFAC82",
            main: "#FF5630",
            dark: "#B71D18",
          },
          warning: {
            main: "#FFAB00",
          },
          disabled: {
            main: "rgba(145 158 171 / 0.24)",
          },
          success: {
            main: "#22C55E",
          },
          background: {
            default: mode === "dark" ? "#141A21" : "rgb(251, 251, 255)",
            paper: mode === "dark" ? "#1C252E" : "rgb(241, 245, 249)",
            neutral: mode === "dark" ? "#28323D" : "rgb(241, 245, 249)",
          },
          text: {
            secondary: mode === "dark" ? "#919EAB" : "#374151",
          },
        },
        shadows: [
          "none",
          "none",
          "rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px",
          ...Array(22).fill("none"),
        ],
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                backgroundColor: "#454f5b",
                borderRadius: "8px",
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor:
                  mode === "dark"
                    ? "rgba(145, 158, 171, 0.2)"
                    : "rgb(241, 245, 249)",
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              contained: {
                boxShadow: "none",
              },
              outlined: {
                borderColor:
                  mode === "dark" ? "rgb(55, 65, 81)" : "rgb(229, 231, 235)",
                color: mode === "dark" ? "white" : "inherit",
                "&:hover": {
                  borderColor: mode === "dark" ? "white" : "rgb(241, 245, 249)",
                  backgroundColor: "inherit",
                },
              },
              root: {
                padding: "6px 12px",
                textTransform: "capitalize",
                borderRadius: "10px",
                fontWeight: 700,
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              list: {
                padding: "0px",
              },
              paper: {
                position: "absolute",
                minWidth: "148px",
                outline: "0px",
                backdropFilter: "blur(20px)",
                backgroundColor: "rgba(28, 37, 46, 0.9)",
                backgroundImage:
                  "url(https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/cyan-blur.png), url(https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/red-blur.png)",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "right top, left bottom",
                backgroundSize: "50%, 50%",
                padding: "4px",
                boxShadow:
                  "rgba(0, 0, 0, 0.24) 0px 0px 2px 0px, rgba(0, 0, 0, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                overflow: "inherit",
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                borderRadius: "6px",
                padding: "6px 8px",
                margin: "0px 0px 4px",
                "&:hover": {
                  backgroundColor: "rgba(145 158 171 / 0.08)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(145 158 171 / 0.16)",
                  backgroundImage: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(145 158 171 / 0.16)",
                  },
                },
                "&:last-child": {
                  marginBottom: 0,
                },
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: "16px",
                // margin: "16px",
                backgroundImage: "none",
                backgroundColor: mode === "dark" && "#1C252E",
                boxShadow: "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px",
              },
            },
          },
          MuiDialogTitle: {
            styleOverrides: {
              root: {
                fontWeight: 600,
                fontSize: "1.125rem",
                padding: "24px 24px 16px",
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === "dark" && "rgb(156, 163, 175)",
              },
            },
          },
          MuiAutocomplete: {
            styleOverrides: {
              paper: {
                borderRadius: "10px",
                backgroundColor: mode === "dark" && "rgb(58,67,79)",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                margin: "3px",
                maxWidth: "calc(100% - 6px)",
                fontSize: "0.8125rem",
                height: "28px",
                backgroundColor: "rgba(145 158 171 / 0.16)",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(145 158 171 / 0.24)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "16px",
                backgroundImage: "none",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px",
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "dark" && "#141A21",
                borderRight: "1px solid #1d242b",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: "10px",
                "& fieldset": {
                  color: "#9CA3AF",
                  borderColor:
                    mode === "dark"
                      ? "rgba(145 158 171 / 0.2)"
                      : "rgb(229, 231, 235)",
                },
              },
            },
          },
        },
        typography: {
          fontFamily: ["Inter", "sans-serif"].join(","),
        },
      }),
    [mode]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header open={open} />
            <MiniDrawer open={open} setOpen={setOpen} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              toastStyle={{ backgroundColor: "rgb(28, 37, 46)" }}
            />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: "8px 24px 64px",
                mt: "80px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forums" element={<Forum />} />
                <Route path="/forum/:forumId" element={<ForumDetails />} />
                <Route path="/generate/course" element={<CreateCourseCard />} />
                <Route path="/course/:courseId" element={<TakeCourse />} />
                <Route
                  path="/destinations"
                  element={<SustainableDestinations />}
                />
              </Routes>
            </Box>
          </Box>
          {/* <AuthVerify logOut={logOut}/> */}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
};

export default App;
