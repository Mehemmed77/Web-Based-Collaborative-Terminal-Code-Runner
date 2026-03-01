import Box from "@mui/material/Box";
import img from "../images/aaaaaaaaaa.jpg";
import { Typography } from "@mui/material";

export default function SessionItem() {
    return (
        <Box className="session-paper re-flex-direction-column" gap={1} position="relative">
            <Box>
                <img src={img} width={200} height={200} />
            </Box>
            <Box>
                <Typography variant="body1" fontWeight="bold"> Intro to Comp. Networks </Typography>
            </Box>
            <Box display="flex">
                <Typography variant="body2">
                    4 items
                </Typography>
                <Box>
                    {/* <CustomSpeedDial /> */}
                </Box>
            </Box>
        </Box>
    )
}