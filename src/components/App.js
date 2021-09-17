import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from './WestworldMap'
import HeadQuarters from './Headquarters'

function App() {
  const [hosts, setHosts] = useState([])
  const [selectedHost, setSelectedHost] = useState(null)
  const [areas, setAreas] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/hosts')
    .then(r => r.json())
    .then(setHosts)
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/areas')
    .then(r => r.json())
    .then(setAreas)
  }, []) 

  return (
    <Segment id="app">
      <WestworldMap />
      <HeadQuarters hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} areas={areas}/>
    </Segment>
  );
}

export default App;
