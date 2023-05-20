import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { Secret, verify } from "jsonwebtoken";
import User from "@/models/User";
import connect from "@/models/connect";
import { ObjectId } from "bson";

export default async function getSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getCookie(process.env.TOKEN_NAME as string, { req, res });
  if (!token) return null;

  const verifiedToken = verify(
    token as string,
    process.env.JWT_KEY as Secret
  ) as { data: string };

  await connect();

  const user = await User.findOne({
    _id: new ObjectId(verifiedToken.data as string),
  })
    .populate("balance")
    .select({ password: 0 });

  if (!user) return null;

  const doc = user?.toJSON();

  return { ...doc, balance: doc?.balance.balance, balanceId: doc?.balance._id };
}
