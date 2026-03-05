import { Box, Grid } from "@mui/material";
import Header from "@/shared/components/Header";
import "./session.css";
import SessionCard from "./sessionCard/Card";

export default function Sessions() {
  return (
    <>
      <Header />

      <Box className="re-flex-column-align-center" gap={3}>
        <Grid
          container
          spacing={6}
          className="grid-container"
          sx={{ justifyContent: "space-between" }}
        >
          <Grid size={3} className="grid-items">
            <SessionCard title="Intro to Comp. Networks" isLive />
          </Grid>
        </Grid>
      </Box>


    </>
  );
}
