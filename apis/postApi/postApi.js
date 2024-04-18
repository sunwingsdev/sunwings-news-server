const express = require("express");
const { ObjectId } = require("mongodb");

const postApi = (postCollection) => {
  const postRouter = express.Router();

  // query search for posts
  postRouter.get("/", async (req, res) => {
    let query = {};
    const category = req.query.category;
    const subCategory = req.query.subCategory;
    if (req.query.category) {
      query.category = category;
    }
    if (req.query.subCategory) {
      query.subCategory = subCategory;
    }
    const result = await postCollection
      .find(query)
      .sort({ publishDate: -1 })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.send(result);
  });


  // single post apis
  postRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }
    const query = { _id: new ObjectId(id) };
    const result = await postCollection.findOne(query);
    res.send(result);
  });

  // post api
  postRouter.post("/", async (req, res) => {
    const newPost = req.body;
    const result = await postCollection.insertOne(newPost);
    res.send(result);
  });

  // update a post
  postRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatePost = req.body;
    const currentDate = new Date();
    const newPost = {
      $set: {
        postTitle: updatePost.postTitle,
        category: updatePost.category,
        subCategory: updatePost.subCategory,
        quill: updatePost.quill,
        status: updatePost.status,
        postThumbnail: updatePost.postThumbnail,
        updateDate: currentDate,
        updateAuthor: updatePost?.updateAuthor,
        updateAuthorImage: updatePost?.updateAuthorImage,
        updateAuthorEmail: updatePost?.updateAuthorEmail,
      },
    };
    const result = await postCollection.updateOne(filter, newPost, options);
    res.send(result);
  });

  // update a post isPopular
  postRouter.put("/popular/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }
    const options = { upsert: true };
    const query = { _id: new ObjectId(id) };
    const updatedDoc = { $set: data };
    const result = await postCollection.updateOne(query, updatedDoc, options);
    res.send(result);
  });

  postRouter.patch("/status/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }
    const query = { _id: new ObjectId(id) };
    const updatedDoc = { $set: { status: "published" } };
    const result = await postCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

  // delete a post
  postRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }

    const query = { _id: new ObjectId(id) };
    const result = await postCollection.deleteOne(query);
    res.send(result);
  });

  return postRouter;
};

module.exports = postApi;
