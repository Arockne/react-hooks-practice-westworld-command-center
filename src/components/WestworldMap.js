import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area'

function WestworldMap({ areas }) {
  return (
    <Segment id="map">
      {
        areas.map(area => <Area key={area.id} area={area}/>)
      }
    </Segment>
  )
}

export default WestworldMap;
