import express from "express"
const app = express()
const host = 2220
const uri = process.env.MONGOURL;
import getnote from "./routes/note/getnote.js"
import createnote from "./routes/note/createnote.js"
import editnote from "./routes/note/editnote.js"
import cors from "cors";
import loginuser from "./routes/auth/login.js";
import deletenote from "./routes/note/deletenote.js";
import updatenote from "./routes/note/updatenote.js"
import updateproject from "./routes/note/updateproject.js"
import updatetodolist from "./routes/note/updatetodo.js"
app.use(cors({ origin:"*"}));
app.use(express.json());

app.use("/getnote",getnote)
app.use("/postnote",createnote)
app.use("/editnote",editnote)
app.use("/login",loginuser)
app.use("/updatenote",updatenote)
app.use("/updateproject",updateproject)
app.use("/updatetodolist",updatetodolist)
app.use("/deletenote",deletenote)

app.get("/",(req,res) => {
    res.json({nama:"devano yudhistira 221"})
})

console.log();

app.listen(host,() => console.log(`http://localhost:${host}`))

export default app