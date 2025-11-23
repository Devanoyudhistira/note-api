import express from "express";
const app = express();
const host = 2220;
import getnote from "./routes/note/getnote.js";
import createnote from "./routes/note/createnote.js";
import editnote from "./routes/note/editnote.js";
import cors from "cors";
import loginuser from "./routes/auth/login.js";
import deletenote from "./routes/note/deletenote.js";
import updatenote from "./routes/note/updatenote.js";
import updateproject from "./routes/note/updateproject.js";
import updatetodolist from "./routes/note/updatetodo.js";
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://devanote.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, httpie)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS")); // block
      }
    },
    credentials: true,
  })
);



if (req.method === "OPTIONS") {
  return res.status(200).end();
}

res.status(200).json({ message: "OK" });

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
