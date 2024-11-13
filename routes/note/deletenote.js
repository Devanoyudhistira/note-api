import express from "express";
const deletenote = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion,ObjectId } from "mongodb";
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

  deletenote.delete("/", async (req,res) => {
        const {target} = req.body;
        const deletedata =await client.db(database).collection(userdb).deleteOne({_id:new ObjectId(target)})
        if(deletedata.deletedCount === 0){
            res.status(408).json({"massage":"there is nothing","status":400,"total":deletedata.deletedCount,"data":deletedata.acknowledged})
        }else{
            res.status(200).json({"massage":"success","status":200,"total":deletedata.deletedCount,"data":deletedata.acknowledged})
        }
  })

  export default deletenote