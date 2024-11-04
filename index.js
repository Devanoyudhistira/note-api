import express from "express"
const app = express()
const host = 2220
import getnote from "./routes/note/getnote.js"
import cors from "cors";

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/getnote",getnote)

app.get("/",(req,res) => {
    res.json({nama:"devano yudhistira"})
})

app.listen(host,() => console.log(`http://localhost:${host}`))

export default app