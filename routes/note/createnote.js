import express from "express";
const createnote = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
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

const postnote = async (req, res, next) => {
  const collection = client.db("noteapp").collection("note-data");
  await collection.insertOne(req.body);
  next();
};

createnote.use(postnote);

createnote.post("/note", (req, res) => {
  const { notetitle, notedate, notevalue } = req.body;
  res.json(req.body);
});

export default createnote;
