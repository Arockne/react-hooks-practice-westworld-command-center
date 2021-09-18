import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from './ColdStorage'

function Headquarters({ hosts, selectedHost, setSelectedHost, areas, onChangeHostData }) {
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} setSelectedHost={setSelectedHost} selectedHost={selectedHost}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost={selectedHost} areas={areas} onChangeHostData={onChangeHostData}/>
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
