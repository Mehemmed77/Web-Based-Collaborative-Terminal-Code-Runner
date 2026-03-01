import SessionItem from "./SessionItem";
import "../css/profile.css";
import { Grid } from "@mui/material";

export default function Profile() {
  return (
    <Grid container spacing={2} className="grid-container">
        <Grid size={4}>
            <SessionItem />
        </Grid>
        <Grid size={4}>
            <SessionItem />
        </Grid>
        <Grid size={4}>
            <SessionItem />
        </Grid>
    </Grid>
  );
}
