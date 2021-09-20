import React from "react";
import { Card } from "semantic-ui-react";
import Host from './Host'

function HostList({ hosts, setSelectedHost, selectedHost }) {
  hosts = hosts.filter(host => !host.active)
  return (
    <Card.Group itemsPerRow={6}>
      {
        hosts.map(host => <Host key={host.id} host={host} setSelectedHost={setSelectedHost} selectedHost={selectedHost}/>)
      }
    </Card.Group>
  );
}

export default HostList;
