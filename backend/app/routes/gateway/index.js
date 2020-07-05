const express = require("express");
const gatewayController = require("./../../controllers/gatewayController");
const router = express.Router();

router.post("/gateway", gatewayController.addGateway);

router.get("/gateway", gatewayController.getGateways);

router.get(
  "/gateway/:gateway_id/devices",
  gatewayController.getDeviceByGateways
);

module.exports = router;
