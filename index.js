import express from "express";
import cors from "cors";

const app = express();
const host = 2220;

import getnote from "./routes/note/getnote.js";
import createnote from "./routes/note/createnote.js";
import editnote from "./routes/note/editnote.js";
import loginuser from "./routes/auth/login.js";
import deletenote from "./routes/note/deletenote.js";
import updatenote from "./routes/note/updatenote.js";
import updateproject from "./routes/note/updateproject.js";
import updatetodolist from "./routes/note/updatetodo.js";

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://devanote.vercel.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow tools like HTTPie

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ROUTES
app.use("/getnote", getnote);
app.use("/postnote", createnote);
app.use("/editnote", editnote);
app.use("/auth", loginuser);
app.use("/updatenote", updatenote);
app.use("/updateproject", updateproject);
app.use("/updatetodolist", updatetodolist);
app.use("/deletenote", deletenote);

app.get("/", (req, res) => {
  res.json({ nama: "devano yudhistira" });
});

app.listen(host, () => console.log(`http://localhost:${host}`));

export default app;
