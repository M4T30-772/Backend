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
    // ako smo inicijalizirali bazu i klijent je još uvijek spojen
    if (db && client.isConnected()) {
      resolve(db);
    } else {
      client.connect((err) => {
        if (err) {
          reject("Spajanje na bazu nije uspjelo:" + err);
        } else {
          console.log("Database connected successfully!");
          db = client.db("Library");
          resolve(db);
        }
      });
    }
  });
};
