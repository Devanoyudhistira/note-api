import express from "express";
const getnote = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.mongourl;
const data = process.env.notedata
const documents = process.env.documents

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
const getdata = async (req, res, next) => {
  try {
    const collection = client.db(documents).collection(data);
    const result = await collection.find().toArray();
    req.blogdata = result;
    next();
  } catch (error) {
    console.log(error);
  }
};
getnote.use(getdata);
getnote.get("/", (req, res) => {
  const passkey = req.get("passkey");
  if (passkey === "devano yudhistira jago banget bjir") {
    res.status(200).json(req.blogdata);
  } else {
    res.status(401).json({ status: 401, massage: "unauthorize" });
  }
});

export default getnote
