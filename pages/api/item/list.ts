import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/models/connect";
import Item, { IItem } from "@/models/Item";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).send({ error: "Method not allowed" });

  const { filter } = req.query;

  try {
    await connect();
    let query = {};
    if (filter !== "all") {
      query = {
        duration_end:
          filter === "ongoing" ? { $gte: new Date() } : { $lte: new Date() },
      };
    }

    const items: IItem[] = await Item.find(query).populate("bids");
    if (!items.length) return res.json([]);

    const data: any[] = [];
    items.forEach((item) => {
      const doc = item.toJSON();
      doc.current_price = doc.bids.length
        ? doc.bids.reduce((prev: any, curr: any) =>
            prev.price > curr.price ? prev : curr
          ).price
        : doc.start_price;
      data.push(doc);
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
