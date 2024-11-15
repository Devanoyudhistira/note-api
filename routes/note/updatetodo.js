import express from "express";
const updatetodolist = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const uri = process.env.MONGOURL;
const database = "noteapp";
const userdb = "note-data";

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

updatetodolist.put("/", async (req, res, next) => {
  const { target, newtitle, task } = req.body;
  const update = await client
    .db(database)
    .collection(userdb)
    .updateOne(
      { _id: new ObjectId(target) },
      { $set: { "agenda": newtitle,list:task} }
    );
    res.status(202).json({massage:"berhasil",data:req.body,total:update.modifiedCount })
});

export default updatetodolist