const express = require("express");
const { database } = require("./config/config");
const { router } = require("./routes/router");
const jwt = require('jsonwebtoken')

const app = express();
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const websockets = require("ws");
const cookieParser = require("cookie-parser");
const wss = new websockets.Server({ server });

app.use(cors());
app.use(express.json());
app.use(cookieParser())
database();

app.use("/api/v1", router);

const PORT = 3000;

wss.on("connection", (ws , req) => {
  console.log("new client connected");

  ws.on("message", (message) => {
    console.log(`message received : ${message}`);
    wss.clients.forEach((client) => {
      
        if (client.readyState === websockets.OPEN) {
          client.send(message);
        }
      });
     
  });



  

  ws.on("close", (ws) => {
    console.log("websockets connnection is closed");
  });
});


wss.on('connection', (ws, req) => {
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  console.log("urlParams" , urlParams)
  const token = urlParams.get('token');
  console.log("req.headers" , req.headers)

  if (!token) {
    ws.send(JSON.stringify({ error: 'Authentication token is missing' }));
    ws.close();
    return;
  }

  try {
    const decoded = jwt.verify(token, 'sarvajeet');
    const username = decoded.username;
    

    console.log(`${username} connected`);
  } catch (error) {
    console.error('Token verification failed:', error);
    ws.send(JSON.stringify({ error: 'Invalid token' }));
    ws.close();
  }
});


app.get("/", (req, res) => {
  res.send("<h1>ChatApp</h1>");
});

server.listen(PORT, () => {
  console.log(`app listen on this ${PORT}`);
});
