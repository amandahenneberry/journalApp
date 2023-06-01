const express = require('express')
const router = require('express').Router()
const fetch = require("node-fetch");

const weatherApiKey = () => {
    try {
    
      return process.env.REACT_APP_WEATHER_API_KEY
    } catch (err) {
      return { Error: err.stack };
    }
};

router.get("/", (req, res) => {
    res.json(weatherApiKey())
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