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

  function handlChangeHostData(id, changedData) {
    fetch(`http://localhost:3001/hosts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedData)
    })
    .then(r => r.json())
    .then(data => {
      setHosts(hosts.map(host => {
        if (host.id === data.id) {
          return data;
        }
        return host;
      }))
      setSelectedHost(data)
    })
  }
  

  return (
    <Segment id="app">
      <WestworldMap areas={areas}/>
      <HeadQuarters hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} areas={areas} onChangeHostData={handlChangeHostData}/>
    </Segment>
  );
}

export default App;
