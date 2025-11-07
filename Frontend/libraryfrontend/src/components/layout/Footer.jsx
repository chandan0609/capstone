import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from "@mui/icons-material/Policy";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #ffffff, #a8e063)",
        color: "green",
        py: 2,
        mt: 1,
        borderTop: "1px solid rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Side - Brand & Year */}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          © {year}{" "}
          <Box component="span" sx={{ color: "green", fontWeight: 600 }}>
            Library System
          </Box>
          . All rights reserved.
        </Typography>

        {/* Right Side - Navigation Links with Icons */}
        <Stack direction="row" spacing={2}>
          <IconButton
            component={Link}
            to="/privacy"
            sx={{ color: "green", "&:hover": { color: "#2e7d32" } }}
          >
            <PolicyIcon />
          </IconButton>

          <IconButton
            component={Link}
            to="/terms"
            sx={{ color: "green", "&:hover": { color: "#2e7d32" } }}
          >
            <GavelIcon />
          </IconButton>

          <IconButton
            component={Link}
            to="/contact"
            sx={{ color: "green", "&:hover": { color: "#2e7d32" } }}
          >
            <ContactMailIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Optional: Small decorative icon below */}
    </Box>
  );
};

export default Footer;
