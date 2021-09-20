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

  function handleChangeHostData(id, changedData) {
    if (changedData.area) {
      const area = areas.find(area => area.name === changedData.area)
      const numHostInArea = hosts.filter(host => host.area === changedData.area).length;

      if (area.limit === numHostInArea) {
        console.log('Limit REACH!', area , numHostInArea)
        return;
      }
    }
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

  function handleActivation(active) {
    const updatedHosts = hosts.map(host => {
      return {...host, active}
    })

    setHosts(updatedHosts)
  }
  

  return (
    <Segment id="app">
      <WestworldMap hosts={hosts} areas={areas} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>
      <HeadQuarters hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} areas={areas} onChangeHostData={handleChangeHostData} onActivation={handleActivation}/>
    </Segment>
  );
}

export default App;
