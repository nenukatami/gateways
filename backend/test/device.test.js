"use strict";

process.env["NODE_ENV"] = "testing";
const request = require("supertest");
const app = require("../app");
const utils = require("./helpers/utils");

describe("Devices endpoints", () => {
  let devicesData = [];
  let gatewayData = {};
  let gatewayMaxDev = {};

  const initializeDatabase = async () => {
    devicesData = await utils.populateDeviceModel();
    const docs = await utils.populateGatewayModel(devicesData);
    gatewayData = docs[0];
    gatewayMaxDev = docs[1];
    return true;
  };

  const clearDatabase = async () => {
    await utils.clearPopulatedModels();
    return true;
  };

  beforeAll(async () => {
    await clearDatabase();
    await initializeDatabase();
  });

  describe("Delete /device/gateway_id/device_id", () => {
    test("Should delete a device", (done) => {
      request(app)
        .delete("/api/device/" + gatewayData._id + "/" + gatewayData.devices[0])
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);

          done();
        });
    });

    test("Should be not found: gateway does not exist", (done) => {
      request(app)
        .delete(
          "/api/device/5efaa149388b6408d0268f03/" + gatewayData.devices[0]
        )
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Gateway not found" });

          done();
        });
    });

    test("Should be not found: device does not exist", (done) => {
      request(app)
        .delete("/api/device/" + gatewayData._id + "/5efaa149388b6408d0268f03")
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Device not found" });

          done();
        });
    });
  });

  describe("Post /device", () => {
    test("Should create a new device", (done) => {
      const uid = Math.floor(Math.random() * 100000 + 1);

      request(app)
        .post("/api/device/" + gatewayData._id)
        .send({
          uid: uid,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              uid: expect.any(Number),
              vendor: expect.any(String),
              status: expect.any(Boolean),
              dateCreated: expect.any(String),
              __v: expect.any(Number),
            })
          );

          done();
        });
    });

    test("Should be not found: gateway does not exist", (done) => {
      const uid = Math.floor(Math.random() * 100000 + 1);

      request(app)
        .post("/api/device/5efaa149388b6408d0268f03")
        .send({
          uid: uid,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Gateway not found" });

          done();
        });
    });

    test("Should be bad request: gateway has 10 devices", (done) => {
      const uid = Math.floor(Math.random() * 100000 + 1);
      request(app)
        .post("/api/device/" + gatewayMaxDev._id)
        .send({
          uid: uid,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Maximun devices exceded" });

          done();
        });
    });

    test("Shoudl be bad request: uid already exists", (done) => {
      request(app)
        .post("/api/device/" + gatewayData._id)
        .send({
          uid: devicesData[devicesData.length - 1].uid,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "UID already exists" });

          done();
        });
    });

    test("Should be bad request: uid is required", (done) => {
      request(app)
        .post("/api/device/" + gatewayData._id)
        .send({
          uid: null,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Path `uid` is required." });

          done();
        });
    });
  });
});
