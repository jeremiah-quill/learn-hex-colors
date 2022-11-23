import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const score = await database.collection("highscores").insertOne(req.body);

  res.status(200).json({ score });
}
