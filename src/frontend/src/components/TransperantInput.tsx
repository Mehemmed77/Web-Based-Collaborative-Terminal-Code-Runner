import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
// import { authInputStyle } from "/auth/authInputStyle";

interface TransperantInputProps {
  label: string
  isPassword?: boolean
}

export default function TransperantInput( {label, isPassword}: TransperantInputProps ) {
  return (
    <Box className="re-flex-align-center">
      <FormLabel> {label} </FormLabel>
      <TextField
        type={isPassword === true ? "password" : "text"}
        variant="filled"
        size="small"
        hiddenLabel
        placeholder="Enter value"
        InputProps={{
          disableUnderline: true,
        }}
        // sx={authInputStyle}
      />
    </Box>
  );
}
