import express from "express";
const editnote = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const uri = process.env.MONGOURL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connection = async () => {
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
  } catch (error) {
    console.log(error + "failed");
  }
};

connection();

editnote.put("/note", async (req, res) => {
  const { target, title, value } = req.body;
//   if (target && title && value) {
    await client
      .db("noteapp")
      .collection("note-data")
      .updateOne({ _id: new ObjectId(target) }, { $set:{agenda: title, blog: value} });
    res.status(201).json({ data: req.body, status: 201, massage: "success" });
//   }
});

export default editnote
