const express = require("express");
const { ObjectId } = require("mongodb");

const bodyThemeApi = (bodyThemeCollection) => {
  const bodyThemeRouter = express.Router();

  bodyThemeRouter.get("/", async (req, res) => {
    const result = await bodyThemeCollection.find().toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  bodyThemeRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateBodyTheme = req.body;

    // Construct the newBodyTheme object dynamically
    const newBodyTheme = { $set: {} };
    for (const key in updateBodyTheme) {
      if (updateBodyTheme.hasOwnProperty(key)) {
        newBodyTheme.$set[key] = updateBodyTheme[key];
      }
    }

    // Perform the update operation
    const result = await bodyThemeCollection.updateOne(
      filter,
      newBodyTheme,
      options
    );
    res.send(result);
  });
  return bodyThemeRouter;
};

module.exports = bodyThemeApi;
