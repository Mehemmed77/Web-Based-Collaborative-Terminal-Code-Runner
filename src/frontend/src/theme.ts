import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0B0F1A",
      paper: "#11162A",
    },
    primary: {
      main: "#4C8DFF",
      contrastText: "#E6EAF2",
    },
    secondary: {
      main: "#9AA3B2",
    },
    text: {
      primary: "#E6EAF2",
      secondary: "#9AA3B2",
      disabled: "#6F7787",
    },
    divider: "rgba(255,255,255,0.08)",
  },

  shape: {
    borderRadius: 5,
  },

  typography: {
    fontFamily: `"IBM Plex Mono", monospace`,
    h5: {
      fontSize: "1.55rem",
      fontWeight: 600,
      color: "#E6EAF2",
    },
    body1: {
      fontSize: "0.95rem",
      color: "#9AA3B2",
      fontWeight: 500,
      lineHeight: 1.5,
    },

    body2: {
      fontSize: "0.85rem",
      color: "#B0B8C8",
      fontWeight: 300,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      color: "#6F7787",
    },
    button: {
      fontSize: "0.9rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },
});

export default theme;
