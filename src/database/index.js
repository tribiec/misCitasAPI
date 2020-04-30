import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const uri = "mongodb://heroku_863t28vz:4ofivrqere41q0i8856uuodg57@ds129641.mlab.com:29641/heroku_863t28vz";
const dbName = "heroku_863t28vz";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();
const db = client.db(dbName);
console.log("Connected to DB");
export default db;