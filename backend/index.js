const express = require('express');
const { database } = require('./config/config');
const app = express()


database();



const PORT = 3000;

app.get('/' , (req, res) => {
    res.send('<h1>ChatApp</h1>')
})

app.listen(PORT , () => {
    console.log(`app listen on this ${PORT}`)
})