import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const scores = await database
    .collection("highscores")
    .find({})
    .sort({ score: -1 })
    .limit(10)
    .toArray();
  res.status(200).json(scores);
}
