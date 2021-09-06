import express from "express";
import storage from "./memory_storage.js";
import cors from "cors";
import connect from "./db.js";
import auth from "./auth";
const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati
app.use(cors());
app.use(express.json());
app.get("/knjige", async (req, res) => {
  let db = await connect();
  let cursor = await db.collection("knjige").find();
  let result = await cursor.toArray();
  res.json(result);
  if (result && result.insertedCount == 1) {
    res.json(result.ops[0]);
  } else {
    res.json({ status: "fail" });
  }
});
app.get("/users", async (req, res) => {
  let db = await connect();
  let cursor = await db.collection("users").find();
  let result = await cursor.toArray();
  res.json(result);
  if (result && result.insertedCount == 1) {
    res.json(result.ops[0]);
  } else {
    res.json({ status: "fail" });
  }
});
app.post("/users", async (req, res) => {
  let user = req.body;
  let id;
  try {
    id = await auth.registerUser(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json({ id: id });
});

app.listen(port, () =>
  console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`)
);
