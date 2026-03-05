import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#1A1410",  // deep espresso
      paper: "#221A15",    // reading surface
    },

    primary: {
      main: "#C6A15B",     // muted brass (academic accent)
      contrastText: "#F3EFE6",
    },

    secondary: {
      main: "#9C8B78",     // warm neutral
    },

    text: {
      primary: "#F3EFE6",   // warm paper white
      secondary: "#C8BFB3",
      disabled: "#7E7266",
    },

    divider: "rgba(243,239,230,0.08)",
  },

  shape: {
    borderRadius: 6,
  },

  typography: {
    fontFamily: `"Inter", system-ui, sans-serif`,
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "0.01em",
      color: "#F0EBE0"
    },

    h5: {
      fontSize: "1.6rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#1C1917",
    },

    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#C5BDB2",
    },

    // Reading text
    body1: {
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "#C5BDB2",
      fontWeight: 400,
    },
    
    body2: {
      fontSize: "0.9rem",
      color: "#191919",
      fontWeight: 400,
    },
    
    caption: {
      fontSize: "0.75rem",
      color: "#7E7266",
      letterSpacing: "0.02em",
    },
    
    button: {
      fontSize: "0.9rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme;