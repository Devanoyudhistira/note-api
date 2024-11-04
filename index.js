import express from "express"
const app = express()
const host = 2220
import getnote from "./routes/note/getnote.js"

app.use("/getnote",getnote)

app.get("/",(req,res) => {
    res.json({nama:"devano yudhistira"})
})

app.listen(host,() => console.log(`http://localhost:${host}`))