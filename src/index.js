import express from "express";
import storage from "./memory_storage.js";
import cors from "cors";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati
app.use(cors());

app.get("/knjige", (req, res) => {
  let knjige = storage.knjige;
  res.json(knjige);
});

app.listen(port, () =>
  console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`)
);
