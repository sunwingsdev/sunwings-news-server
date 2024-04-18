const express = require("express");

const commentApi = (commentCollection) => {
  const commentRouter = express.Router();

  //   add comment
  commentRouter.post("/", async (req, res) => {
    const commentInfo = req.body;
    const result = await commentCollection.insertOne(commentInfo);
    res.send(result);
  });

  // get all comments
  commentRouter.get("/all-comments", async (req, res) => {
    const result = await commentCollection.find().toArray();
    res.send(result);
  });

  //   get comment by news id
  commentRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (req.params.id) {
      const query = { newsId: id };
      const result = await commentCollection.find(query).toArray();
      res.send(result);
    }
  });
  return commentRouter;
};
module.exports = commentApi;
