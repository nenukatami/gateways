const mongoose = require("mongoose");
const gatewayModel = mongoose.model("gateways");

const gateway = function (req, res, next) {
  const gateway_id = req.params.gateway_id;

  gatewayModel.findOne({ _id: gateway_id }).exec(function (err, g) {
    if (err || !g) {
      var msg = err ? err.message : "Gateway not found";
      var status = err ? 400 : 404;
      return res.status(status).send({ message: msg });
    } else {
      req.gateway = g;
      next();
    }
  });
};
exports.gateway = gateway;
