import * as React from "react";
import { ToggleButton, ToggleButtonGroup, Box, useTheme } from "@mui/material";

export default function AuthToggle() {
  const theme = useTheme();
  const [value, setValue] = React.useState("login");

  const handleChange = (event: React.MouseEvent, newValue: any) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 999,
        display: "inline-block",
      }}
    >
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        sx={{
          fontWeight: "300",
          bgcolor: "#1f2937",
          borderRadius: 999,
          "& .MuiToggleButton-root": {
            border: 0,
            borderRadius: 999,
            px: 2,
            py: 0.5,
            transition: "all 0.25s ease",
            color: "#9ca3af",
            textTransform: "none",
          },
          "& .Mui-selected": {
            bgcolor: `${theme.palette.primary.main} !important`,
            color: "#fff !important",
          },
        }}
      >
        <ToggleButton value="login">login()</ToggleButton>
        <ToggleButton value="register">register()</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
