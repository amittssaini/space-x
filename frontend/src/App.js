
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [latestLaunch,setLatestLaunch] =  useState({})
  const [totalPastLaunches,setTotalPastLaunches]=useState(0)

  const fetchData=async()=>{
    let url ="http://localhost:8082/api/space";
    try {
    let response = await axios.get(`${url}/latest`)
    console.log(response.data)
    setLatestLaunch(response.data);
    console.log(latestLaunch)
    } catch (error) {
      
    }
  }

  const fetchPastLaunches=async()=>{
    let url ="http://localhost:8082/api/space";
    try {
    let response = await axios.get(`${url}/pastLaunches`)
    console.log(response.data)
    setTotalPastLaunches(response.data.TotalPastLaunches)
  
    
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchData();
    fetchPastLaunches();
  },[])
  return (
    <div className="App">
     <div className='App-header'> Space -x  Launch Info </div>
     <div className='launch-container'>
     <div className='launch-card'>
     <h2>Latest Launch</h2>
     <p><strong>Launch Name:</strong> {latestLaunch['Launch Name']}</p>
      <p><strong>Launch Date (UTC):</strong> {latestLaunch['Launch Date (UTC)']}</p>
      <p><strong>Rocket Name:</strong> {latestLaunch['Rocket Name']}</p>
      <p><strong>LaunchPad Name:</strong> {latestLaunch['LaunchPad Name']}</p>
      </div>
            <div className='launch-card'>
              <h2>Total Past Launches </h2>
              <p>
              {totalPastLaunches!==0?totalPastLaunches:'...Loading'}
              </p>
            </div>
      </div>
    </div>
  );
}

export default App;
