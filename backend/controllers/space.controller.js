const axios = require('axios')
require('dotenv').config();
 require('axios')


 const fetchDataFromAPI=async()=>{

    const URL = process.env.URL;

    try {
        const response = await axios.get(`${URL}/launches/latest`);
        const data = response.data;
        const rocketId = data.rocket
        const launchpadId = data.launchpad;
        //console.log(rocketId);
        const rocketResponse=await axios.get(`${URL}/rockets/${rocketId}`)
        //console.log(rocketResponse.data.name);
        const launchpadResponse = await axios.get(`${URL}/launchpads/${launchpadId}`)
        //console.log(launchpadResponse.data.name)
        const spaceData={
            "Launch Name" :data.name,
            "Launch Date (UTC)":data.date_utc,
            "Rocket Name":rocketResponse.data.name,
            "LaunchPad Name":launchpadResponse.data.name
        }
        console.log(spaceData);
        return(spaceData)
    } catch (error) {
        console.error("Error during fetching the past spacx launches data ",error.message)
        throw new Error("Fail to Lauch data of spacex")
    }
 }

 const getSpaceData=async(req,res)=>{
    try {
        const response = await fetchDataFromAPI();
        res.status(200).json(response)
    } catch (error) {
        console.error('Controller Error:', error.message);
    res.status(500).json({ error: error.message });
    }
 }

 const fetchDataLaunchesAPI=async()=>{
    const URL = process.env.URL;
    try {
        const response = await axios.get(`${URL}/launches`)
        //console.log(typeof(response.data));
        const launchData = response.data;
       // console.log(launchData.length)
        let currentDate = new Date();
       // console.log(currentDate);
        const newArray = launchData.filter((launch)=>new Date(launch.date_utc)<currentDate)
       // console.log(newArray.length);
        return newArray.length;
    } catch (error) {
        console.error("Error during fetching the past spacx launches data ",error.message)
        throw new Error("Fail to Launch past data of spacex")
    }
 }
 const getPastLaunches=async(req,res)=>{
    try {
        const response = await fetchDataLaunchesAPI();
        console.log(response)
        res.json({TotalPastLaunches:response})
    } catch (error) {
        console.log("Fail to fetch data ",error.message);
        res.status(500).json({error:error.message})
    }
 }

 module.exports={getSpaceData,getPastLaunches}