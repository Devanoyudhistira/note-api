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
loginuser.use(
  cookieSession({
    name: "session",
    keys: ["devano"],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

loginuser.post("/login", async (req, res) => {
  try {
    const { username, nickname } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    await connectDB(); // IMPORTANT!!

    const loginuserCollection = client.db(database).collection(userdb);
    const user = await loginuserCollection.findOne({ username });

    if (!user) {
      // Create new user
      const create = await loginuserCollection.insertOne({
        username,
        nickname,
      });

      req.session.user = { id: create.insertedId };

      return res.status(201).json({
        message: "User added",
        user: req.session.user,
        data: req.body,
      });
    }

    // Existing user
    req.session.user = { id: user._id };

    return res.status(200).json({
      message: "Login success",
      user: req.session.user,
      data: req.body,
    });
  } catch (err) {
    console.log("Login route error:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
});

export default loginuser;
