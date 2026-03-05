import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Person2Icon from '@mui/icons-material/Person2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
    return (
        <Box display="flex" justifyContent="space-between" p={3}>
            <Typography variant="h3">
                [unwritten]
            </Typography>

            <Box display="flex" gap={2}>
                <Button variant="outlined" sx={{ width: "fit-content" }}>
                    <NotificationsIcon />
                </Button>
                <Button variant="outlined">
                    <Person2Icon />
                </Button>
                <Button variant="outlined">
                    <SearchIcon />
                </Button>
            </Box>
        </Box>
    )
}