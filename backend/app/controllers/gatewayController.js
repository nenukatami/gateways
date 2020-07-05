const gateway = require("../models/gateway");
const handleError = require("../helpers/utils").getErrorMessage(
  "Serial number already exists"
);

const addGateway = (req, res) => {
  const newGateway = new gateway(req.body);

  newGateway.save((err) => {
    return err
      ? res.status(400).send({ message: handleError(err) })
      : res.status(200).jsonp(newGateway);
  });
};
module.exports.addGateway = addGateway;

const getGateways = (req, res) => {
  gateway.find({}, "_id ipv serialNumber name", (err, gateways) => {
    return err
      ? res.status(400).send({ message: handleError(err) })
      : res.status(200).jsonp(gateways);
  });
};
module.exports.getGateways = getGateways;

const getDeviceByGateways = async (req, res) => {
  const gateway_id = req.params.gateway_id;

  gateway
    .findOne({ _id: gateway_id })
    .populate("devices")
    .exec((err, g) => {
      if (err) {
        return res.status(400).send({ message: handleError(err) });
      } else {
        res.status(200).jsonp(g.devices);
      }
    });
};
module.exports.getDeviceByGateways = getDeviceByGateways;
