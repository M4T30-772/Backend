import express from "express";
import storage from "./memory_storage.js";
import cors from "cors";
import connect from "./db.js";
const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati
app.use(cors());

app.get("/knjige_memory", (req, res) => {
  let knjige = storage.knjige;
  res.json(knjige);
});

app.get("/knjige", async (req, res) => {
  let db = await connect();
  let cursor = await db.collection("knjige").find();
  let results = await cursor.toArray();
  res.json(results);
  if (result && result.insertedCount == 1) {
    res.json(result.ops[0]);
  } else {
    res.json({ status: "fail" });
  }
});

app.post("/knjige", async (req, res) => {
  let data = req.body;
  delete data._id;
  let db = await connect();
  let result = await db.collection("knjige").insertOne(data);
  console.log(result);
});
app.listen(port, () =>
  console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`)
);
