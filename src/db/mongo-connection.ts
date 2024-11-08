import { MongoClient, ServerApiVersion, Db, Collection, Document } from "mongodb";
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



async function connectToDatabase(): Promise<Db> {
  let db: Db;
  await client.connect();
  db = client.db("pet_express_db"); 
  
  return db;
}

async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T>> {
  const db = await connectToDatabase();

  return db.collection<T>(collectionName);
}


export { getCollection };
