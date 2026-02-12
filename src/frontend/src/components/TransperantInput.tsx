import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

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
        sx={{
          width: 200,
          "& .MuiFilledInput-root": {
            backgroundColor: "transparent",
            borderRadius: 1,
            fontSize: "0.875rem",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&.Mui-focused": {
              backgroundColor: "transparent",
            },
          },
          "& .MuiFilledInput-input": {
            padding: "8px 12px",
          },
        }}
      />
    </Box>
  );
}
