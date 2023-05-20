import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import connect from "@/models/connect";
import validateEmail from "@/utils/validateEmail";

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

  const { email, password } = req.body as IUser;

  if (!email || !validateEmail(email))
    return res.status(403).send({ error: "invalid email" });

  try {
    await connect();

    const user = await User.findOne({
      email,
    }).populate("balance");

    if (!user) return res.status(404).send({ error: "User not found" });

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) return res.status(403).send("invalid password");

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
    res.json({ ...doc, balance: doc.balance.balance });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
