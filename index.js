const express = require("express");
const app = express();
const ngrok = require("ngrok");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Welcome to Localhost Explorer");
});

app.get("/killall", (req, res) => {
  const tunnels = axios
    .get("http://127.0.0.1:4040/api/tunnels/")
    .then((data) =>
      data.data.tunnels.map((d) =>
        axios.delete(`http://127.0.0.1:4040/api/tunnels/${d.name}`)
      )
    );
  res.send("Check console");
});

app.post("/url", async (req, res) => {
  const port = await req.body.url.match(/\d+/g)[0];
  try {
    var url = await ngrok.connect({
      // auth: "nitin@chalopadho.com:nitin@ngrok",
      addr: port,
    });
  } catch (error) {
    console.log("error", error);
  }

  res.send(url);
});

app.listen(2001, () => console.log("App running on port 2001"));
