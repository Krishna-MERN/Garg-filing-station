const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  name: String,

  mobile: String,

  passbookNo: String,

   branch: String,
 

  otp: String,

  otpStatus: String,

  incomingCylinder: String,

  outgoingCylinder: String,

  deliveryStatus: String,

  price: Number,

  cost: Number,

  paidAmount: Number,

  unpaidAmount: Number,

  paymentType: String,

  comment: String,

 

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sale", saleSchema);
