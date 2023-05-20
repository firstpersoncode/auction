import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { genSalt, hash } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import Balance from "@/models/Balance";
import connect from "@/models/connect";
import validateEmail from "@/utils/validateEmail";
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

  const { name, email, password } = req.body as IUser;

  if (!name) return res.status(403).send({ error: "invalid name" });

  if (!email || !validateEmail(email))
    return res.status(403).send({ error: "invalid email" });

  try {
    await connect();

    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const balance = await Balance.create({ balance: 0 });

    await User.updateOne(
      { _id: new ObjectId(user._id as string) },
      { balance: new ObjectId(balance._id as string) }
    );

    const expiresIn = 60 * 60 * 24 * 7;

    const token = sign({ data: user._id }, process.env.JWT_KEY as Secret, {
      expiresIn,
    });

    setCookie(process.env.TOKEN_NAME as string, token, {
      req,
      res,
      maxAge: expiresIn,
      httpOnly: true,
      path: "/",
    });

    const doc = user.toJSON();
    doc.password = undefined as any;
    const docBalance = balance.toJSON();
    res.json({ ...doc, balance: docBalance.balance });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
