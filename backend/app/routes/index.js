const deviceRoutes = require("./device");
const gatewayRoutes = require("./gateway");

const init = (app) => {
  app.use("/api", deviceRoutes);
  app.use("/api", gatewayRoutes);
};

module.exports.init = init;
