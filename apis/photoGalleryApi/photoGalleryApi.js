const express = require("express");
const { ObjectId } = require("mongodb");

const photoGalleryAPi = (photoGalleryCollection) => {
  const photoGalleryRouter = express.Router();

  photoGalleryRouter.get("/", async (req, res) => {
    const result = await photoGalleryCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  photoGalleryRouter.post("/", async (req, res) => {
    const newPhoto = req.body;
    newPhoto.isSelected = false;
    const result = await photoGalleryCollection.insertOne(newPhoto);
    res.send(result);
  });

  photoGalleryRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { isSelected } = req.body;
    const filter = { _id: new ObjectId(id) };
    const updatePhoto = {
      $set: {
        isSelected: isSelected,
      },
    };
    const result = await photoGalleryCollection.updateOne(filter, updatePhoto);
    res.send(result);
  });

  photoGalleryRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }

    const query = { _id: new ObjectId(id) };
    const result = await photoGalleryCollection.deleteOne(query);
    res.send(result);
  });

  return photoGalleryRouter;
};

module.exports = photoGalleryAPi;
