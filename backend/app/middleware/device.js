const mongoose = require("mongoose");
const deviceModel = mongoose.model("devices");

const device = (req, res, next) => {
  const device_id = req.params.device_id;

  deviceModel.findOne({ _id: device_id }).exec((err, d) => {
    if (err || !d) {
      var msg = err ? err.message : "Device not found";
      var status = err ? 400 : 404;
      return res.status(status).send({ message: msg });
    } else {
      req.device = d;
      next();
    }
  });
};
exports.device = device;
