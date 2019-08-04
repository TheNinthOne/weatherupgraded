#Updated weather web app
Here is the modified version of the weather application I showed you last time, using axios promises <br>
With it you can check the current temperature in any city 

##Available Scripts

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost/:3000](http//localhost:3000) to view it in the browser.

On it you can also change the system in which the temperature is (metric/imperial) <br>
In case you don't want to check the whole thing here is the most important code: <br>
##code <br>
app.post("/", (req, res) => {
  const { city, units } = req.body;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  //koriscenje axios promisa (promise-ify http request) downnnnn

  axios
    .get(url)
    .then(response => {
      const weather = response.data;
      const { main, name } = weather;
      const weatherText = `It's ${main.temp} degrees in ${name}!`;
      res.render("index", { weather: weatherText, error: null });
    })
    .catch(error => {
      //custom error cuz I wanted to torture myself a little
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
