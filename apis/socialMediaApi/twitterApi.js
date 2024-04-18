const express = require("express");
const { ObjectId } = require("mongodb");

const twitterApi = (twitterCollection) => {
  const twitterRouter = express.Router();

  twitterRouter.get("/", async (req, res) => {
    const result = await twitterCollection.find().toArray();
    res.send(result);
  });

  twitterRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateTwitter = req.body;
    const newTwitter = {
      $set: {
        title: updateTwitter.title,
        link: updateTwitter.link,
        profilePhoto: updateTwitter.profilePhoto,
        coverPhoto: updateTwitter.coverPhoto,
      },
    };
    const result = await twitterCollection.updateOne(
      filter,
      newTwitter,
      options
    );
    res.send(result);
  });

  return twitterRouter;
};

module.exports = twitterApi;
