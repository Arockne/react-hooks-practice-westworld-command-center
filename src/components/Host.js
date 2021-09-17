import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

/*
{
"id": 1,
"firstName": "Dolores",
"lastName": "Abernathy",
"active": false,
"imageUrl": "https://vignette.wikia.nocookie.net/westworld/images/5/51/Dolores_Abernathy_Vanishing_Point.jpg/revision/latest?cb=20180613181613",
"gender": "Female",
"area": "lowlands",
"authorized": false
},
*/

function Host({ host, setSelectedHost, selectedHost }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  return (
    <Card
      className={"host selected"}
      onClick={() => setSelectedHost(host)}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
