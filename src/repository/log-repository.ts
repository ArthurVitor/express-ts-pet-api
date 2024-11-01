import { dbContext } from "../db/mongo-connection";

export async function logRequest(requestUrl: string, requestMethod: string, time?: Date) {
    try {
        const db = await dbContext();
        const logCollection = db.collection("log_cl");

        logCollection.insertOne(
            {
                requestUrl: requestUrl,
                requestMethod: requestMethod,
                time: time
            }
        )

        return;
    } catch (error) {
        return;
    }
}