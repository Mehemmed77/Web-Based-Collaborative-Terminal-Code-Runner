import SessionItem from "./SessionItem";
import "../css/profile.css";
import { Grid, Typography } from "@mui/material";
import ControlPanel from "./ControlPanel";
import Header from "../components/Header";

export default function Profile() {
  return (
    <>
      <Header />
      <Typography mb={1} variant="h3" textAlign={"center"}>Your Saved Study Sessions</Typography>
      <Grid container spacing={2} className="grid-container" sx={{ justifyContent: "space-between" }}>
        <Grid size={4} className="grid-items">
          <SessionItem title="Intro to Comp. Networks" picUrl="comp-networks.png" />
        </Grid>
        <Grid size={4} className="grid-items">
          <SessionItem title="Comp-org" picUrl="comp-org.png" />
        </Grid>
        <Grid size={4} className="grid-items">
          <SessionItem title="Physics" picUrl="physics.jpeg" />
        </Grid>
      </Grid>

      <ControlPanel />
    </>
  );
}
