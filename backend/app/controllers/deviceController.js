const device = require("../models/device");
const handleError = require("../helpers/utils").getErrorMessage(
  "UID already exists"
);

/** Add device to a gateway
 * 	post - /device/:gateway_id
 */
const addDevice = (req, res) => {
  const gateway = req.gateway;

  if (gateway.devices.length >= 10) {
    res.status(400).send({ message: "Maximun devices exceded" });
  } else {
    const newDevice = new device(req.body);

    newDevice.save((err) => {
      if (err) {
        res.status(400).send({ message: handleError(err) });
      } else {
        gateway.devices.push({ _id: newDevice._id });
        gateway.save((err) => {
          return err
            ? res.status(400).send({ message: handleError(err) })
            : res.status(200).jsonp(newDevice);
        });
      }
    });
  }
};
module.exports.addDevice = addDevice;

/** Remove device and update gateway devices
 * 	delete - /device/:gateway_id/:device_id
 */
const removeDevice = (req, res) => {
  const gateway = req.gateway;
  const deviceObj = req.device;
  const deletedDevice = deviceObj._id;

  deviceObj.remove((err) => {
    if (err) {
      res.status(400).send({ message: handleError(err) });
    } else {
      gateway.devices = gateway.devices.filter((dev) => {
        return dev.toString() !== deletedDevice.toString();
      });

      gateway.save((err) => {
        return err
          ? res.status(400).send({ message: handleError(err) })
          : res.status(204).send();
      });
    }
  });
};
module.exports.removeDevice = removeDevice;
