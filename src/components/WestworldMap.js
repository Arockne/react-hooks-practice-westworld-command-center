import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area'

function WestworldMap({ hosts, areas, selectedHost, setSelectedHost }) {
  const activeHosts = hosts.filter(host => host.active)
  return (
    <Segment id="map">
      {
        areas.map(area => <Area key={area.id} area={area} hosts={activeHosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>)
      }
    </Segment>
  )
}

export default WestworldMap;
