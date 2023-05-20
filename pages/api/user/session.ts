import { NextApiRequest, NextApiResponse } from "next";
import getSession from "@/libs/getSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).send({ error: "Method not allowed" });

  try {
    const user = await getSession(req, res);

    if (!user) return res.status(404).send({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}
