const express = require("express");
const { ObjectId } = require("mongodb");

const footerThemeApi = (footerCollection) => {
  const footerThemeRouter = express.Router();

  footerThemeRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateFooter = req.body;
    const newFooter = {
      $set: {
        bgColor: updateFooter.bgColor,
        textColor: updateFooter.textColor,
        iconColor: updateFooter.iconColor,
        copyrightBgColor: updateFooter.copyrightBgColor,
        copyrightTextColor: updateFooter.copyrightTextColor,
      },
    };
    const result = await footerCollection.updateOne(filter, newFooter, options);
    res.send(result);
  });
  return footerThemeRouter;
};

module.exports = footerThemeApi;
