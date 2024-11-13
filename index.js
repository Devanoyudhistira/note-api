import express from "express"
const app = express()
const host = 2220
import getnote from "./routes/note/getnote.js"
import createnote from "./routes/note/createnote.js"
import editnote from "./routes/note/editnote.js"
import cors from "cors";
import loginuser from "./routes/auth/login.js"
import deletenote from "./routes/note/deletenote.js"
app.use(cors({ origin: ["http://localhost:5173","https://devanote.vercel.app/"] ,credentials:true}));
app.use(express.json());

app.use("/getnote",getnote)
app.use("/postnote",createnote)
app.use("/editnote",editnote)
app.use("/auth",loginuser)
app.use("/deletenote",deletenote)

app.get("/",(req,res) => {
    res.json({nama:"devano yudhistira"})
})

app.listen(host,() => console.log(`http://localhost:${host}`))

export default app