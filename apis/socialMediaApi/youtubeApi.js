const express = require("express");
const { ObjectId } = require("mongodb");

const youtubeApi = (youtubeCollection) => {
  const youtubeRouter = express.Router();

  youtubeRouter.get("/", async (req, res) => {
    const result = await youtubeCollection.find().toArray();
    res.send(result);
  });

  youtubeRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateYoutube = req.body;
    const newYoutube = {
      $set: {
        title: updateYoutube.title,
        videoTitle: updateYoutube.title,
        embedLink: updateYoutube.embedLink,
        channelLink: updateYoutube.channelLink,
        thumbnail: updateYoutube.thumbnail,
      },
    };
    const result = await youtubeCollection.updateOne(
      filter,
      newYoutube,
      options
    );
    res.send(result);
  });

  return youtubeRouter;
};

module.exports = youtubeApi;
