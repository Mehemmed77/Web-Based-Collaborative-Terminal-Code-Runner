import { Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import LongMenu from "@/shared/components/Menu";

interface SessionItemProps {
  title: string;
  isLive: boolean;
}

export default function SessionCard({ title }: SessionItemProps) {
  const truncatedTitle =
    title.length > 20 ? `${title.slice(0, 20)}...` : title;

  return (
    <Box
      className="session-paper re-flex-direction-column"
      gap={1}
      position="relative"
      alignItems="center"
    >
      <Box
        position="relative"
        width={150}
        height={100}
        borderRadius="25px"
        bgcolor="#feebe0"
      >
        <NotStartedIcon className="paper-icon" />
      </Box>

      <Box
        className="re-flex-align-center-justify-between"
        gap={2}
        width="100%"
      >
        <Typography variant="h6" fontWeight="bold">
          {truncatedTitle}
        </Typography>
      </Box>

      <Box
        className="re-flex-align-center-justify-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="h6">3</Typography>
          <PeopleIcon />
        </Box>

        <LongMenu />
      </Box>
    </Box>
  );
}