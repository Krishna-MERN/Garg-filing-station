const express = require("express");
// use to crash the server
const router = express.Router();

const Sale = require("../models/Sale");
const Cylinder = require("../models/Cylinder");

/* GET ALL SALES */

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* CREATE SALE */

router.post("/sell", async (req, res) => {

 
 
  try {
    
    const data = req.body;
   
    let stock = await Cylinder.findOne();

    if (stock[data.outgoingCylinder].filled <= 0) {
      return res.json({
        success: false,
        message: "Cylinder Out Of Stock",
      });
    }

    /* GET SELLING PRICE */

    const price = stock[data.outgoingCylinder].price;

    /* GET COST PRICE */

    const cost = stock[data.outgoingCylinder].cost;

    /* CALCULATE UNPAID */

    const paid = Number(data.paidAmount) || 0;

    const unpaidAmount = price - paid;

    /* UPDATE STOCK */

    stock[data.outgoingCylinder].filled -= 1;
    stock[data.incomingCylinder].empty += 1;

    await stock.save();

    /* SAVE SALE */


    // const sale = new Sale({
    //   ...data,

    //   price,
    //   cost,
    //   paidAmount: paid,
    //   unpaidAmount,
    // });

    const sale = new Sale({
  name: data.name,
  mobile: data.mobile,
  passbookNo: data.passbookNo,

  branch: data.branch,
  otp: data.otp,
  otpStatus: data.otpStatus,

  incomingCylinder: data.incomingCylinder,
  outgoingCylinder: data.outgoingCylinder,

  deliveryStatus: data.deliveryStatus,

  paymentType: data.paymentType,
  comment: data.comment,

  price,
  cost,
  paidAmount: paid,
  unpaidAmount,
});



  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});



/* UPDATE PAYMENT + COMMENT */

router.put("/:id", async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      {
        paidAmount: Number(req.body.paidAmount),
        comment: req.body.comment,
        otpStatus: req.body.otpStatus,
        deliveryStatus: req.body.deliveryStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSale) {
      return res.status(404).json({
        message: "Sale not found",
       
      });
    }

    updatedSale.unpaidAmount =
      Number(updatedSale.price || 0) - Number(updatedSale.paidAmount || 0);

    await updatedSale.save();
    

    res.json({
      success: true,
      sale: updatedSale,
    });
  } catch (err) {
    console.log("UPDATE ERROR:", err);

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});
/* DELETE SALE */

router.delete("/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);

    res.json({
      message: "Sale Deleted",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// sale profit report
router.get("/report", async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};

    if (from && to) {
      filter.date = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const sales = await Sale.find(filter);

    let totalCost = 0;
    let totalPaid = 0;
    let totalUnpaid = 0;

    sales.forEach((sale) => {
      totalCost += sale.cost || 0;
      totalPaid += sale.paidAmount || 0;
      totalUnpaid += sale.unpaidAmount || 0;
    });

    res.json({
      sales,
      totalCost,
      totalPaid,
      totalUnpaid,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
