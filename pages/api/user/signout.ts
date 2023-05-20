import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).send({ error: "Method not allowed" });

  deleteCookie(process.env.TOKEN_NAME as string, { req, res });

  res.end();
}
