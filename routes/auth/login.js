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
  const { username ,nickname} = req.body;
  if (username) {
    const loginuser = await client.db(database).collection(userdb);
    const searchresult = await loginuser.find({ username: username }).toArray();
    if (searchresult.length === 0) {
      userconnect.insertOne({username:username,nickname:nickname});
      res.status(204).json({ massage: "add new user", status: 202 ,data:req.body});
    } else {
      res
        .status(202)
        .json({ massage: "login success", data: loginuser, status: 200,data:req.body });
    }
  } else {
    res.status(408).json({ massage: "bad request", status: 408 });
  }
});


export default loginuser;
