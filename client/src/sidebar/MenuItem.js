import { Box, ButtonBase } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItem({ linkName, name, icon }) {
  const navigate = useNavigate();

  return (
    <ButtonBase
      onClick={() => navigate(linkName)}
      sx={{
        cursor: "pointer",
        justifyContent: "start",
        width: "100%",
        backgroundColor:
          window.location.pathname === linkName
            ? "rgba(0, 167, 111, 0.08)"
            : "transparent",
        padding: theme => theme.spacing(1.5),
        borderRadius: "8px",
        color:
          window.location.pathname === linkName
            ? "#5BE49B"
            : "rgb(145, 158, 171)",
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.57143,
        minHeight: "44px",
        "&:hover": {
          backgroundColor:
            window.location.pathname === linkName
              ? "rgba(0, 167, 111, 0.16)"
              : "rgba(145, 158, 171, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          width: "24px",
          height: "24px",
          mr: 1.5,
          display: "inline-flex",
          backgroundColor: "currentcolor",
          mask: icon,
        }}
      />{" "}
      {name}
    </ButtonBase>
  );
}
