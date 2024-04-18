const express = require("express");
const { ObjectId } = require("mongodb");

const footerApi = (footerCollection) => {
  const footerRouter = express.Router();

  footerRouter.get("/", async (req, res) => {
    const result = await footerCollection.find().toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  footerRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateFooter = req.body;
    const newFooter = {
      $set: {
        footerLogo: updateFooter.footerLogo,
        about: updateFooter.about,
        sompadokAndProkashok: updateFooter.sompadokAndProkashok,
        nirbahiSompadok: updateFooter.nirbahiSompadok,
        bartaSompadok: updateFooter.bartaSompadok,
        officeAddress: updateFooter.officeAddress,
        officeEmail: updateFooter.officeEmail,
        officeMobile: updateFooter.officeMobile,
        copyrightLink: updateFooter?.copyrightLink,
        copyrightText: updateFooter?.copyrightText,
      },
    };
    const result = await footerCollection.updateOne(filter, newFooter, options);
    res.send(result);
  });
  return footerRouter;
};

module.exports = footerApi;
