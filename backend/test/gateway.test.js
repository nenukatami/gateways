"use strict";

process.env["NODE_ENV"] = "testing";
const request = require("supertest");
const app = require("../app");
const utils = require("./helpers/utils");

describe("Gateways endpoints", () => {
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

  describe("Get /gateway", () => {
    test("Correct gateways returned", (done) => {
      request(app)
        .get("/api/gateway")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body instanceof Array).toBeTruthy();
          expect(res.body.length).toBeGreaterThan(0);

          done();
        });
    });
  });

  describe("Get /gateway/devices", () => {
    test("Correct devices of gateway returned", (done) => {
      request(app)
        .get("/api/gateway/" + gatewayData._id + "/devices")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body instanceof Array).toBeTruthy();

          done();
        });
    });

    test("Not found because gateway does not exist", (done) => {
      request(app)
        .get("/api/gateway/5efaa12f38gb6408d0268f01/devices")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          done();
        });
    });
  });

  describe("Post /gateway", () => {
    test("Should create a new gateway", (done) => {
      const serialNumber = "sn-" + Math.floor(Math.random() * 100000 + 1);

      request(app)
        .post("/api/gateway")
        .send({
          name: "",
          ipv: "10.2.36.9",
          serialNumber: serialNumber,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              serialNumber: expect.any(String),
              name: expect.any(String),
              ipv: expect.any(String),
              devices: [],
            })
          );

          done();
        });
    });

    test("Bad request: serial number already exists", (done) => {
      request(app)
        .post("/api/gateway")
        .send({
          name: "",
          ipv: "10.2.36.9",
          serialNumber: gatewayData.serialNumber,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Serial number already exists" });

          done();
        });
    });

    test("Bad request: incorrect IPv4", (done) => {
      const serialNumber = "sn-" + Math.floor(Math.random() * 100000 + 1);

      request(app)
        .post("/api/gateway")
        .send({
          name: "",
          ipv: "10.",
          serialNumber: serialNumber,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual({ message: "Incorrect IPv4" });

          done();
        });
    });
  });
});
