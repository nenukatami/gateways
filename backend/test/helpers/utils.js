"use strict";

const gatewayModel = require("../../app/models/gateway");
const deviceModel = require("../../app/models/device");

const populateDeviceModel = function () {
  return deviceModel.insertMany([
    { uid: Math.floor(Math.random() * 100000 + 1) },
    { uid: Math.floor(Math.random() * 100000 + 1) },
  ]);
};
module.exports.populateDeviceModel = populateDeviceModel;

const populateGatewayModel = function (devicesData) {
  return gatewayModel.insertMany([
    {
      name: "test gateway",
      ipv: "10.2.36.9",
      serialNumber: "sn-" + Math.floor(Math.random() * 100000 + 1),
      devices: [devicesData[0]._id, devicesData[1]._id],
    },
    {
      name: "test gateway max devices",
      ipv: "10.2.36.25",
      serialNumber: "sn-" + Math.floor(Math.random() * 100000 + 1),
      devices: new Array(10).fill(0).map(function () {
        let addDevice = new deviceModel({});
        return addDevice._id;
      }),
    },
  ]);
};
module.exports.populateGatewayModel = populateGatewayModel;

const clearPopulatedModels = function () {
  return Promise.all([gatewayModel.remove({}), deviceModel.remove({})]);
};
module.exports.clearPopulatedModels = clearPopulatedModels;
