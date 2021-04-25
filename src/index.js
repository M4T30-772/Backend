import express from "express";
import storage from "./store";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  let suma = 1 + 3;
  res.send("Hello za browser");
  console.log("Hello konzola");
});
app.post("/", (req, res) => {
  console.log("Post metoda");
  res.json({ status: "OK" });
});

//Ispis svih dostupnih knjiga (PRETRAGA)
app.get("/knjiznica", (req, res) => {
  res.json(storage.knjige);
});
//Dodavanje nove knjige (KNJIŽNIČAR)
app.post("/knjiznica", (req, res) => {
  let doc = req.body;
  storage.knjige.push(doc);
  res.json({ status: "ok" });
});
//pretraga specificne knjige
app.get("/knjiznica/knjiga/:naziv", (req, res) => {
  let naziv = req.params.naziv;
  console.log("Pretraga knjige: ", naziv);
  res.json(storage.knjige.filter((x) => x.naziv == naziv));
});

app.listen(port, () => console.log(`Slušam na portu ${port}`));
