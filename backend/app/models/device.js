const mongoose = require("mongoose");

module.exports = mongoose.model("devices", {
  uid: {
    type: Number,
    unique: true,
    required: true,
  },
  vendor: {
    type: String,
    default: "",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
