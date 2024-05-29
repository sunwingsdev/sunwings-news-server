const express = require("express");
const { ObjectId } = require("mongodb");

const advertisementApi = (advertisementCollection) => {
  const advertisementRouter = express.Router();

  advertisementRouter.get("/", async (req, res) => {
    const result = await advertisementCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });

  advertisementRouter.post("/", async (req, res) => {
    const newAdvertisement = req.body;
    const newPrice = newAdvertisement.price;
    const updatedPrice = parseFloat(newPrice);
    newAdvertisement.isSelected = false;
    newAdvertisement.price = updatedPrice;
    newAdvertisement.status = "pending";
    const result = await advertisementCollection.insertOne(newAdvertisement);
    res.send(result);
  });

 
advertisementRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { isSelected } = req.body;
    const filter = { _id: new ObjectId(id) };
    const foundResult = await advertisementCollection.findOne(filter);
    if (!foundResult) {
      return res.status(404).send({ message: 'Advertisement not found' });
    }
    const updateAd = {
      $set: { isSelected: isSelected },
    };
    const result = await advertisementCollection.updateOne(filter, updateAd);
    const updateOthersFilter = {
      _id: { $ne: new ObjectId(id) },
      position: foundResult.position,
    };
    const updateOthers = {
      $set: { isSelected: false },
    };
    await advertisementCollection.updateMany(updateOthersFilter, updateOthers);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred', error });
  }
});

  advertisementRouter.patch("/status/:id", async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateAd = {
      $set: {
        status: status,
      },
    };
    const result = await advertisementCollection.updateOne(filter, updateAd);
    res.send(result);
  });

  advertisementRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }

    const query = { _id: new ObjectId(id) };
    const result = await advertisementCollection.deleteOne(query);
    res.send(result);
  });

  return advertisementRouter;
};

module.exports = advertisementApi;
