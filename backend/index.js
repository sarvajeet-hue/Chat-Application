const express = require('express');
const { database } = require('./config/config');
const { router } = require('./routes/router');
const app = express()

app.use(express.json())
database();


app.use('/api/v1' , router)


const PORT = 3000;

app.get('/' , (req, res) => {
    res.send('<h1>ChatApp</h1>')
})

app.listen(PORT , () => {
    console.log(`app listen on this ${PORT}`)
})