const express = require("express");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  //   store user in db
  userRouter.post("/", async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await usersCollection.findOne(query);
    if (existingUser) {
      return res.send("user already exists");
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

  // get all users
  userRouter.get("/", async (req, res) => {
    let query = {};
    const email = req.query.email;
    if (req.query.email) {
      query:{
        email: email;
      }
    }
    const result = await usersCollection.find(query).toArray();
    res.send(result);
  });

  userRouter.get("/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = { uid: uid };
    // console.log(query);
    const result = await usersCollection.findOne(query);
    res.send(result);
  });

  // set role api
  userRouter.put("/role", async (req, res) => {
    const uid = req.query.uid;
    const role = req.query.role;
    console.log(uid, role);
    const query = { uid: uid };
    const options = { upsert: true };
    const updatedDoc = {
      $set: { role },
    };
    const result = await usersCollection.updateOne(query, updatedDoc, options);
    res.send(result);
  });

  // delete a user
  userRouter.delete("/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = { uid: uid };
    const result = await usersCollection.deleteOne(query);
    res.send(result);
  });

  return userRouter;
};
module.exports = usersApi;
