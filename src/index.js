import dotenv from "dotenv";
dotenv.config();
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
app.get("/knjige1", (req, res) => {
  let knjige = storage.knjige_memory;
  res.json(knjige);
});
app.post("/knjige", async (req, res) => {
  let data = req.body;
  delete data._id;
  let db = await connect();
  let result = await db.collection("knjige").insertOne(data);

  if (result && result.insertedCount == 1) {
    res.json(result.ops[0]);
  } else {
    res.json({
      status: "fail",
    });
  }

  res.json(data);
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
app.get("/tajna", [auth.verify], (req, res) => {
  res.json({ message: "ovo je tajna" + req.jwt.username });
});
app.post("/auth", async (req, res) => {
  let user = req.body;

  try {
    let result = await auth.autheticateUser(user.username, user.password);
    res.json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

app.listen(port, () =>
  console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`)
);
