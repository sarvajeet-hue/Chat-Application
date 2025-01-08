const express = require("express");
const { database } = require("./config/config");
const { router } = require("./routes/router");
const app = express();
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const websockets = require("ws");
const wss = new websockets.Server({ server });

app.use(cors());
app.use(express.json());
database();

app.use("/api/v1", router);

const PORT = 3000;

wss.on("connection", (ws) => {
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

app.get("/", (req, res) => {
  res.send("<h1>ChatApp</h1>");
});

server.listen(PORT, () => {
  console.log(`app listen on this ${PORT}`);
});
