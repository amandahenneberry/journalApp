const express = require('express')
const router = require('express').Router()
const fetch = require("node-fetch");

//LOCATION 
const fetchLocation = async(lat, long) => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  try{
    const location = await fetch(url);
    const locationJson = await location.json();
    return locationJson
  }catch(err){
    console.log('error in fetchLocation route')
  }
}

router.get("/:lat/:long", async (req, res) =>{
  const data = {
    "lat": req.params.lat,
    "long": req.params.long
  }
  const dataArr = Object.values(data);
  const lat = dataArr[0];
  const long  = dataArr[1];

  const newData = await fetchLocation(lat, long);
  res.json(newData)
})

router.post('/', async (req, res) =>{
  const lat = req.body.latitude;
  const long = req.body.longitude;
  
  const data = await fetchLocation(lat, long);
  res.json(data)
})

//WEATHER
const fetchWeather = async(lat, long) =>{
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  try{
    const data = await fetch(url);
    const dataJson = await data.json();
    return dataJson
  }catch(err){
    console.log('error in fetchWeather route')
  }
}

router.get("/data/:lat/:long", async (req, res) =>{
  const data = {
    "lat": req.params.lat,
    "long": req.params.long
  }
  const dataArr = Object.values(data);
  const lat = dataArr[0];
  const long  = dataArr[1];

  const newData = await fetchWeather(lat, long);
  res.json(newData)
});

router.post('/data', async (req, res) =>{
  const lat = req.body.latitude;
  const long = req.body.longitude;
  
  const data = await fetchLocation(lat, long);
  res.json(data)
})

// const fetchWeather = async (searchtext) => {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
//   try {
//     const weatherStream = await fetch(url);
//     const weatherJson = await weatherStream.json();
//     return weatherJson;
//   } catch (err) {
//     return { Error: err.stack };
//   }
// };

// router.get("/", (req, res) => {
//   res.json({ success: "Hello Weather!" });
// });

// router.get("/:searchtext", async (req, res) => {
//   const searchtext = req.params.searchtext;
//   const data = await fetchWeather(searchtext);
//   res.json(data);
// });

// router.post("/", async (req, res) => {
//   const searchtext = req.body.searchtext;
//   const data = await fetchWeather(searchtext);
//   res.json(data);
// });

module.exports = router;