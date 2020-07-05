const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateIp = function (ipv) {
  var re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  return re.test(ipv);
};

module.exports = mongoose.model("gateways", {
  serialNumber: {
    type: String,
    unique: true,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  ipv: {
    type: String,
    default: "",
    validate: [validateIp, "Incorrect IPv4"],
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "devices",
    },
  ],
});
