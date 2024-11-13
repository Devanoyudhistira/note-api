import express from "express";
const createnote = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGOURL;
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
createnote.use(express.urlencoded({ extended: true }));
createnote.use(cookieParser());
createnote.use(cookieSession({
  name: 'session',
  keys: ['devano'],
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax'
}));

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
  res.json(req.body);
});

export default createnote;
