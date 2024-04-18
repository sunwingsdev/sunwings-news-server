const express = require("express");
const { ObjectId } = require("mongodb");

const videoGalleryAPi = (videoGalleryCollection) => {
  const videoGalleryRouter = express.Router();

  videoGalleryRouter.get("/", async (req, res) => {
    const result = await videoGalleryCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  videoGalleryRouter.post("/", async (req, res) => {
    const newVideo = req.body;
    newVideo.isSelected = false;
    const result = await videoGalleryCollection.insertOne(newVideo);
    res.send(result);
  });

  videoGalleryRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { isSelected } = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateVideo = {
      $set: {
        isSelected: isSelected,
      },
    };
    const result = await videoGalleryCollection.updateOne(filter, updateVideo);
    res.send(result);
  });

  videoGalleryRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }

    const query = { _id: new ObjectId(id) };
    const result = await videoGalleryCollection.deleteOne(query);
    res.send(result);
  });

  return videoGalleryRouter;
};

module.exports = videoGalleryAPi;
