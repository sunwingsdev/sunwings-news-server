const express = require("express");

const paymentApi = (paymentCollection) => {
  const paymentRouter = express.Router();
  paymentRouter.post("/", async (req, res) => {
    const paymentInfo = req.body;
    paymentInfo.time = new Date();
    paymentInfo.price = parseFloat(paymentInfo.price);
    paymentInfo.status = "pending";
    const result = await paymentCollection.insertOne(paymentInfo);
    res.send(result);
  });
  return paymentRouter;
};
module.exports = paymentApi;
