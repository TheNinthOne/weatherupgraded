const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");
const app = express();

const apiKey = "7d0326c823085ee71f5249d462f23b5b";

app.use(express.static("public")); //accessing the css file
app.use(bodyParser.urlencoded({ extended: true })); ////idk y but i need this to use the req.body object (middleware*)
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", (req, res) => {
  const { city, units } = req.body;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios
    .get(url)
    .then(response => {
      const weather = response.data;
      const { main, name } = weather;
      const weatherText = `It's ${main.temp} degrees in ${name}!`;
      res.render("index", { weather: weatherText, error: null });
    })
    .catch(error => {
      const { cod } = error.response.data;
      switch (cod) {
        case "400": {
          msg = "You have to provide a city, plese try again!";
          break;
        }
        case "404": {
          msg = "That city does not exist! Are you sure it wasn't a typo?";
          break;
        }
        default: {
          msg =
            "Error while contacting API, sorry for the inconvinience. Please try again later!";
          break;
        }
      }
      res.render("index", {
        weather: null,
        error: msg
      });
    });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
