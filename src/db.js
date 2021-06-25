import mongo from "mongodb";

let connection_string =
  "mongodb+srv://mpakter:mpakter@library.nuxvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let client = new mongo.MongoClient(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

export default () => {
  return new Promise((resolve, reject) => {
    if (db && client.isConnected()) {
      resolve(db);
    }
    client.connect((err) => {
      if (err) {
        reject("Došlo je do greške prilikom spajanja " + err);
      } else {
        console.log("Uspješno spajanje na bazu");
        let db = client.db("Library");
        resolve(db);
      }
    });
  });
};
