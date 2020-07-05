const express = require("express");
const deviceController = require("./../../controllers/deviceController");
const gatewayMiddleware = require("../../middleware/gateway");
const deviceMiddleware = require("../../middleware/device");
const router = express.Router();

router.post(
  "/device/:gateway_id",
  gatewayMiddleware.gateway,
  deviceController.addDevice
);

router.delete(
  "/device/:gateway_id/:device_id",
  gatewayMiddleware.gateway,
  deviceMiddleware.device,
  deviceController.removeDevice
);

module.exports = router;
