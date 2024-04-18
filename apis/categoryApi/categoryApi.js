const express = require("express");
const { ObjectId } = require("mongodb");

const categoryApi = (categoriesCollection) => {
  const categoryRouter = express.Router();

  // apis here
  categoryRouter.get("/", async (req, res) => {
    const result = await categoriesCollection.find().toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.send(result);
  });

  //get category by id
  categoryRouter.get("/:selectedCategory", async (req, res) => {
    const selectCategory = req.params.selectedCategory;

    const filter = {
      categoryName: selectCategory,
    };
    const result = await categoriesCollection.find(filter).toArray();
    res.send(result);
  });

  // post categories to db
  categoryRouter.post("/", async (req, res) => {
    const categoryInfo = req.body;
    const query = { slug: req.body.slug };
    const foundData = await categoriesCollection.findOne(query);
    if (foundData?.slug === categoryInfo.slug) {
      return res.status(404).json({ message: "Slug already listed" });
    }

    const result = await categoriesCollection.insertOne(categoryInfo);
    res.send(result);
    
  });

  // delete a single category
  categoryRouter.delete("/:id", async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await categoriesCollection.deleteOne(query);
    res.send(result);
  });
  return categoryRouter;
};
module.exports = categoryApi;
