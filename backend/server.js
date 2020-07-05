const app = require("./app");
const config = require("./config");

// get env port
const port = config.port;

/******************** start server ********************/
app.listen(port, () => {
  console.log("Launched app on port %s", port);
});
