import express from "express"
const app = express()
const host = 2220
import getnote from "./routes/note/getnote.js"
const uri = process.env.MONGOURL;

app.use("/getnote",getnote)

app.get("/",(req,res) => {
    res.json({nama:"devano yudhistira",note:uri})
})

app.listen(host,() => console.log(`http://localhost:${host}`))