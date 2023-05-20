import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/models/connect";
import Balance, { IBalance } from "@/models/Balance";
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

  const { balance } = req.body as IBalance;

  try {
    await connect();

    const user = await getSession(req, res);

    if (!user) return res.status(404).send({ error: "User not found" });

    const totalBalance = Number(user.balance) + Number(balance);

    await Balance.updateOne(
      { _id: new ObjectId(user.balanceId as string) },
      {
        balance: totalBalance,
      }
    );

    res.json({ totalBalance });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
