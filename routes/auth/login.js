import express from "express";
const loginuser = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

const uri = process.env.MONGOURL;
const database = "noteapp";
const userdb = "usernote";

loginuser.use(express.urlencoded({ extended: true }));
loginuser.use(cookieParser());
loginuser.use(cookieSession({
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
    console.log(error + " failed");
  }
};

loginuser.post("/login", async (req, res) => {
  const { username, nickname } = req.body;
  if (username) {
    const loginuserCollection = await client.db(database).collection(userdb);
    const searchresult = await loginuserCollection.find({ username }).toArray();

    if (searchresult.length === 0) {
      const createuser = await loginuserCollection.insertOne({ username, nickname });
      req.session.nama = (await createuser).insertedId;
      res.status(200).json({ message: "User added", status: 202, user: req.session.nama.nama, data: req.body });
    } else {
      const userid = searchresult[0]["_id"];
      req.session.nama = { name: userid };
      res.status(202).json({ message: "Login success", user: req.session.nama, status: 200, data: req.body });
    }
  } else {
    res.status(408).json({ message: "Bad request", status: 408 });
  }
});

export default loginuser;
