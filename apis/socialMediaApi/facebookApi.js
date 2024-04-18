const express = require("express");
const { ObjectId } = require("mongodb");

const facebookApi = (facebookCollection) => {
  const facebookRouter = express.Router();

  facebookRouter.get("/", async (req, res) => {
    const result = await facebookCollection.find().toArray();
    res.send(result);
  });

  facebookRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateFacebook = req.body;
    const newFacebook = {
      $set: {
        title: updateFacebook.title,
        link: updateFacebook.link,
        profilePhoto: updateFacebook.profilePhoto,
        coverPhoto: updateFacebook.coverPhoto,
      },
    };
    const result = await facebookCollection.updateOne(
      filter,
      newFacebook,
      options
    );
    res.send(result);
  });

  return facebookRouter;
};

module.exports = facebookApi;
