import express from "express";
const loginuser = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGOURL;
const database = "noteapp";
const userdb = "usernote";

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

loginuser.post("/login", async (req, res) => {
  const { username } = req.body;
  if (username) {
    const loginuser = await client.db(database).collection(userdb);
    const searchresult = await loginuser.find({ username: username }).toArray();
    if (searchresult.length === 0) {
      res.status(404).json({ massage: "failed", status: 404 });
    } else {
      res
        .status(202)
        .json({ massage: "login success", data: loginuser, status: 200 });
    }
  } else {
    res.status(408).json({ massage: "bad request", status: 408 });
  }
});

loginuser.post("/signin", async (req, res) => {
  const { username } = req.body;
  if (username) {
    const userconnect = await client.db(database).collection(userdb);
    const checkuser = await userconnect.find({ username: username }).toArray();
    if (checkuser.length === 0) {
      userconnect.insertOne({username:username});
      res.status(200).json({ massage: "sign in success", stnatus: 200 });
    } else {
      res.status(400).json({ massage:"you already have an account", status: 400 });
    }
  } else {
    res.status(408).json({ massage: "bad request", status: 408 });
  }
});

export default loginuser;
