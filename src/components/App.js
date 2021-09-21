import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from './WestworldMap'
import HeadQuarters from './Headquarters'
import { Log } from "../services/Log";

function App() {
  const [hosts, setHosts] = useState([])
  const [selectedHost, setSelectedHost] = useState(null)
  const [areas, setAreas] = useState([])
  const [logs, setLogs] = useState([])

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
      const host = hosts.find(host => host.id === id)
//Error: Too many hosts. Cannot add {first name of host} to {formatted area name}
      if (area.limit === numHostInArea) {
        const log = Log.error(`Too many hosts. Cannot add ${host.firstName} to ${area.name}`)
        setLogs([ log, ...logs ])
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
      if (changedData.area) {
        const log = Log.notify(`${data.firstName} set in area ${data.area}`)
        setLogs([ log, ...logs ])
      }
      if (changedData.active === true) {
        const log = Log.warn(`Activated ${data.firstName}`)
        setLogs([ log, ...logs ])
      }
      else if (changedData.active === false) {
        const log = Log.notify(`Decommissioned ${data.firstName}`)
        setLogs([ log, ...logs ])
      }

      setHosts(hosts.map(host => {
        if (host.id === data.id) {
          return data;
        }
        return host;
      }))
      setSelectedHost(data)
    })
  }

  function onActivation(active) {
    const updatedHosts = hosts.map(host => {
      return {...host, active}
    })
    if (active) {
      const log = Log.warn(`Activating all hosts!`)
      setLogs([ log, ...logs ])
    } else {
      const log = Log.notify(`Decommissiong all hosts!`)
      setLogs([ log, ...logs ])
    }
    setHosts(updatedHosts)
  }
  

  return (
    <Segment id="app">
      <WestworldMap hosts={hosts} areas={areas} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>
      <HeadQuarters hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} areas={areas} onChangeHostData={handleChangeHostData} onActivation={onActivation} logs={logs}/>
    </Segment>
  );
}

export default App;
