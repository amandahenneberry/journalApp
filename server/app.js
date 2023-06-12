const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require("cors")
require("dotenv").config();
module.exports = app

// require shh
if (process.env.NODE_ENV !== "production") require("../.shh.js");
const JWT = process.env.JWT;
const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL;
const REACT_WEATHER_API_KEY = process.env.REACT_WEATHER_API_KEY;
const CLOUDINARY_URL= process.env.CLOUDINARY_URL;
const NPM_CONFIG_LEGACY_PEER_DEPS = process.env.NPM_CONFIG_LEGACY_PEER_DEPS;

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

app.use(cors())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/weather', require('./weather'))
app.use('/cloudinaryLoader', require('./cloudinaryLoader'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
