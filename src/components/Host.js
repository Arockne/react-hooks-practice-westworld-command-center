import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, setSelectedHost, selectedHost }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  let selected = false;
  if (selectedHost !== null) {
    selected = host.firstName === selectedHost.firstName
  }
  return (
    <Card
      className={selected ? 'host selected' : 'host'}
      onClick={() => setSelectedHost(host)}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
