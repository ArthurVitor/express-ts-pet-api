import { MongoClient, ServerApiVersion, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.DB_CONNECTION_STRING;
if (!uri) throw new Error("DB_CONNECTION_STRING must be defined in environment variables");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: Db;

async function connectToDatabase(): Promise<Db> {
  if (!db) { 
    await client.connect();
    db = client.db("pet_express_db"); 
  }
  return db;
}

async function disconnect() {
  await client.close();
  db = client.db(""); 
}

export { connectToDatabase as dbContext, disconnect };
