const express = require('express')
const server = express()
const axios = require('axios');

// Server config
const port = process.env.PORT || 4000

// Endpoints
axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').then(resp => {
    console.log(resp.data);
})


server.listen(port, () => {
   console.log(`Server listening at ${port}`)
})
