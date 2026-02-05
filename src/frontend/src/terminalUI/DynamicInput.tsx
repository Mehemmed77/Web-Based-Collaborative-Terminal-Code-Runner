import { useState, useRef } from "react";
import { Box, TextField } from "@mui/material";
import Cursor from "./Cursor";

export default function DynamicInput() {
  const [value, setValue] = useState("");
  const spanRef = useRef<HTMLSpanElement | null>(null);

  console.log(spanRef.current?.getBoundingClientRect().width);
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", width: "100%", ml: 1, position: "relative" }}>
      {/* hidden mirror */}
      <span
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontFamily: "monospace",
          fontSize: 16,
        }}
      >
        {value || " "}
      </span>

      <TextField
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{ disableUnderline: true }}
        sx={{
            width: "100%",
          "& .MuiInputBase-input": {
            fontFamily: "monospace",
            color: "white",
            caretColor: "transparent",
          },
        }}
      />

      <Box display="flex" height={"32px"} alignItems="center">
        <Cursor widthOfText={spanRef.current?.getBoundingClientRect().width ?? 0} />
      </Box>
    </Box>
  );
}
