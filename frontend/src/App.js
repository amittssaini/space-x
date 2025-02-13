
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
const endpoint={
  url : "https://space-x-l99u.onrender.com/api/space"
}
function App() {
  const [latestLaunch,setLatestLaunch] =  useState({})
  const [totalPastLaunches,setTotalPastLaunches]=useState(0)

  const fetchData=async()=>{
    
    try {
    let response = await axios.get(`${endpoint.url}/latest`)
    console.log(response.data)
    setLatestLaunch(response.data);
    console.log(latestLaunch)
    } catch (error) {
      console.log("Error is occured during fetching the latest launch data ",error)
    }
  }

  const fetchPastLaunches=async()=>{
    try {
    let response = await axios.get(`${endpoint.url}/pastLaunches`)
    console.log(response.data)
    setTotalPastLaunches(response.data.TotalPastLaunches)
  
    
    } catch (error) {
      console.log("Error is occured during fetching the Past launch data ",error)
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
     <p><strong>Launch Name:</strong> {latestLaunch['Launch Name']|| '...Loading'}</p>
      <p><strong>Launch Date (UTC):</strong> {latestLaunch['Launch Date (UTC)']|| '...Loading'}</p>
      <p><strong>Rocket Name:</strong> {latestLaunch['Rocket Name'] || '...Loading'}</p>
      <p><strong>LaunchPad Name:</strong> {latestLaunch['LaunchPad Name']|| '...Loading'}</p>
      </div>
            <div className='launch-card'>
              <h2>Total Past Launches </h2>
              <p> <strong>Total No. of launches in the past </strong>
              {totalPastLaunches!==0?totalPastLaunches:'...Loading'}
              </p>
            </div>
      </div>
    </div>
  );
}

export default App;
