import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/models/connect";
import Bid from "@/models/Bid";
import getSession from "@/libs/getSession";
import { ObjectId } from "bson";
import Item from "@/models/Item";
import Balance from "@/models/Balance";
import User from "@/models/User";
import { differenceInSeconds } from "date-fns";

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

  const { itemRef, price } = req.body as any;

  try {
    await connect();

    const user = await getSession(req, res);

    if (!user) return res.status(404).send({ error: "User not found" });

    if (
      user.lastBid &&
      differenceInSeconds(new Date(), new Date(user.lastBid)) <= 5
    )
      return res.status(403).send({ error: "Should wait 5s before bidding" });

    if (Number(user.balance) < Number(price))
      return res.status(403).send({ error: "Insufficient balance" });

    const item = await Item.findOne({
      _id: new ObjectId(itemRef as string),
    }).populate("bids");

    if (!item) return res.status(404).send({ error: "Item not found" });

    const doc = item.toJSON();

    const highestPrice: number = doc.bids.length
      ? doc.bids.reduce((prev: any, curr: any) =>
          prev.price > curr.price ? prev : curr
        ).price
      : item.start_price;

    if (price <= highestPrice)
      return res.status(403).send({ error: "Current bid is higher" });

    const bid = await Bid.create({
      user: new ObjectId(user._id as string),
      price,
    });

    const docBid = bid.toJSON();

    await Item.updateOne(
      { _id: new ObjectId(itemRef as string) },
      { $push: { bids: new ObjectId(docBid._id as string) } }
    );

    const totalBalance = Number(user.balance) - Number(price);

    await Balance.updateOne(
      { _id: new ObjectId(user.balanceId as string) },
      {
        balance: totalBalance,
      }
    );

    await User.updateOne(
      { _id: new ObjectId(user._id as string) },
      { lastBid: new Date() }
    );

    res.json({ bid: docBid });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
