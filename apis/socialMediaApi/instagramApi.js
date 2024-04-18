const express = require("express");
const { ObjectId } = require("mongodb");

const instagramApi = (instagramCollection) => {
  const instagramRouter = express.Router();

  instagramRouter.get("/", async (req, res) => {
    const result = await instagramCollection.find().toArray();
    res.send(result);
  });

  instagramRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateInstagram = req.body;
    const newInstagram = {
      $set: {
        title: updateInstagram.title,
        link: updateInstagram.link,
        profilePhoto: updateInstagram.profilePhoto,
        coverPhoto: updateInstagram.coverPhoto,
      },
    };
    const result = await instagramCollection.updateOne(
      filter,
      newInstagram,
      options
    );
    res.send(result);
  });

  return instagramRouter;
};

module.exports = instagramApi;
