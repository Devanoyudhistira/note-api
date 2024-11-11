import express from "express";
const loginuser = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGOURL;
const database = "noteapp";
const userdb = "usernote";
import cookieSession from "cookie-session";  

loginuser.use(express.urlencoded({ extended: true }));
loginuser.use(cookieSession({
  secret: 'devano', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  }
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

loginuser.post("/login", async (req, res) => {
  const { username ,nickname} = req.body;
  if (username) {
    const loginuser = await client.db(database).collection(userdb);
    const searchresult = await loginuser.find({ username: username }).toArray();
    if (searchresult.length === 0) {
      const createuser = loginuser.insertOne({username:username,nickname:nickname,});
      req.session.nama = (await createuser).insertedId
      res.status(200).json({ massage: "add new user", status: 202,user:req.session.nama ,data:req.body});
    } else {
      const userid = searchresult[0]["_id"]
      req.session.nama = userid
      res
        .status(202)
        .json({ massage: "login success",user22: req.session.nama ,status: 200,data:req.body });
    }
  } else {
    res.status(408).json({ massage: "bad request", status: 408 });
  }
});


export default loginuser;
