import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/models/connect";
import Item, { IItem } from "@/models/Item";
import validateTimeRange from "@/utils/validateTimeRange";
import getSession from "@/libs/getSession";
import { ObjectId } from "bson";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).send({ error: "Method not allowed" });

  const { name, duration_start, duration_end, start_price } = req.body as IItem;

  if (!name) return res.status(403).send({ error: "Invalid name" });

  if (!start_price)
    return res.status(403).send({ error: "Invalid start price" });

  if (
    !duration_start ||
    !duration_end ||
    !validateTimeRange(duration_start, duration_end)
  )
    return res.status(403).send({ error: "Invalid duration" });

  try {
    await connect();

    const user = await getSession(req, res);

    if (!user) return res.status(404).send({ error: "User not found" });

    const item = await Item.create({
      name,
      duration_start,
      duration_end,
      start_price,
      user: new ObjectId(user._id as string),
    });

    const doc = item.toJSON();

    res.json({ ...doc, current_price: doc.start_price });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
