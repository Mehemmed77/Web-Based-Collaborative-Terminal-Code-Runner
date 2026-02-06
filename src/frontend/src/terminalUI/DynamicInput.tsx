import { useState } from "react";
import { Box, TextField } from "@mui/material";
import Cursor from "./Cursor";
import { CHAR_WIDTH } from "../constants";

export default function DynamicInput() {
  const [value, setValue] = useState("");
  const [caret, setCaret] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setCaret(e.target.selectionStart ?? 0);
  }

  const handleMouseMovement = (e: React.MouseEvent | React.KeyboardEvent) => {
    setCaret((e.target as HTMLInputElement).selectionStart ?? 0);
  }

  return (
    <Box className="terminal-line-container">
      <TextField
        variant="standard"
        value={value}
        onChange={handleChange}
        onClick={handleMouseMovement}
        onKeyUp={handleMouseMovement}
        InputProps={{ disableUnderline: true }}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            fontFamily: "monospace",
            caretColor: "transparent",
            color: "white",
          },
        }}
      />

      <Box className="re-flex-align-center" height="32px">
        <Cursor left={caret * CHAR_WIDTH} />
      </Box>
    </Box>
  );
}
