import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const uri = "mongodb://heroku_d20lv468:6u3fpt2anm350bn1i2a9v27l5k@ds255308.mlab.com:55308/heroku_d20lv468";
const dbName = "heroku_d20lv468";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();
const db = client.db(dbName);
console.log("Connected to DB");
export default db;