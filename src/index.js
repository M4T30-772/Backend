import express from "express";
const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

let today = new Date();

let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
app.get("/", (req, res) =>
  res.send(
    "Prva adresa se zove datum i nalazi se na localhost:3000/date, a druga se zove prognoza i nalazi se na localhost:3000/prognoza"
  )
);
let Zajedno = date + time;
app.get("/date", (req, res) => res.send("Ispis datuma: ", Zajedno));
app.get("/prognoza", (req, res) => res.send("Sunčano vrijeme"));
app.listen(port, () => console.log(`Slušam na portu ${port}!`));
