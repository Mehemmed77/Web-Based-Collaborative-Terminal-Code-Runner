import SessionItem from "./SessionItem";
import "../css/profile.css";
import { Grid } from "@mui/material";
import ControlPanel from "./ControlPanel";

export default function Profile() {
  return (
    <>
      <Grid container spacing={2} className="grid-container">
        <Grid size={4}>
          <SessionItem title="Intro to Comp. Networks" />
        </Grid>
        <Grid size={4}>
          <SessionItem title="Phsyics 101" />
        </Grid>
        <Grid size={4}>
          <SessionItem title="Game Dev" />
        </Grid>
      </Grid>

      <ControlPanel />
    </>
  );
}
