/**
 * @jest-environment node
 */
import { NextApiRequest, NextApiResponse } from "next";
import { RequestMethod, createMocks } from "node-mocks-http";
import signupHandler from "@/pages/api/user/signup";
import signinHandler from "@/pages/api/user/signin";
import depositHandler from "@/pages/api/balance/deposit";
import itemCreateHandler from "@/pages/api/item/create";
import connect from "@/models/connect";
import User from "@/models/User";
import Balance from "@/models/Balance";
import Item from "@/models/Item";
import Bid from "@/models/Bid";
import { add, sub } from "date-fns";

let auth: { req: NextApiRequest; res: NextApiResponse };
let creds = { name: "test", email: "test@test.com", password: "test" };

function trimTextFromWord(text: string, word: string, endChar: string): string {
  const startIndex = text.indexOf(word);
  if (startIndex !== -1) {
    const endIndex = text.indexOf(endChar, startIndex);
    if (endIndex !== -1) {
      const trimmedText = text.substring(startIndex, endIndex).trim();
      return trimmedText;
    }
  }
  return text;
}

function extractCookie(authRes: NextApiResponse) {
  const rawCookie = authRes.getHeaders()["set-cookie"]?.[0];
  const cookie = trimTextFromWord(
    rawCookie,
    process.env.TOKEN_NAME!,
    ";"
  ).split("=")[1];

  return cookie;
}

function mockRequestResponseAuth(
  method: RequestMethod = "POST",
  creds: any
): { req: NextApiRequest; res: NextApiResponse } {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method });
  req.headers = {
    "Content-Type": "application/json",
  };
  req.body = creds;
  return { req, res };
}

function mockRequestResponseDeposit(
  method: RequestMethod = "POST",
  cookie: string
): { req: NextApiRequest; res: NextApiResponse } {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method });

  req.headers = {
    "Content-Type": "application/json",
  };

  req.cookies = {
    [process.env.TOKEN_NAME as string]: cookie,
  };

  req.body = {
    balance: 1000,
  };

  return { req, res };
}

function mockRequestResponseItem(
  method: RequestMethod = "POST",
  cookie: string,
  body: any
): { req: NextApiRequest; res: NextApiResponse } {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method });

  req.headers = {
    "Content-Type": "application/json",
  };

  req.cookies = {
    [process.env.TOKEN_NAME as string]: cookie,
  };

  req.body = body;

  return { req, res };
}

describe("API", () => {
  beforeAll(async () => {
    await connect();
    await User.deleteMany({});
    await Balance.deleteMany({});
    await Item.deleteMany({});
    await Bid.deleteMany({});
  }, 60000);

  it("should failed register new user without name", async () => {
    auth = mockRequestResponseAuth("POST", { ...creds, name: undefined });
    await signupHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(403);
  });

  it("should failed register new user without email", async () => {
    auth = mockRequestResponseAuth("POST", { ...creds, email: undefined });
    await signupHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(403);
  });

  it("should failed register new user with invalid email", async () => {
    auth = mockRequestResponseAuth("POST", { ...creds, email: "INVALID" });
    await signupHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(403);
  });

  it("should successfully register new user", async () => {
    auth = mockRequestResponseAuth("POST", creds);
    await signupHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(200);
    expect(auth.res.statusMessage).toEqual("OK");
    const data = auth.res._getJSONData();
    expect(data.email).toEqual(creds.email);
    const user = await User.findOne({ email: creds.email });
    expect(user?.email).toEqual(data.email);
  });

  it("should failed login without email", async () => {
    auth = mockRequestResponseAuth("POST", { ...creds, email: undefined });
    await signinHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(403);
  });

  it("should failed login with invalid email", async () => {
    auth = mockRequestResponseAuth("POST", { ...creds, email: "INVALID" });
    await signinHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(403);
  });

  it("should failed login with invalid password", async () => {
    auth = mockRequestResponseAuth("POST", { ...creds, password: "INVALID" });
    await signinHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(403);
  });

  it("should successfully login", async () => {
    auth = mockRequestResponseAuth("POST", creds);
    await signinHandler(auth.req, auth.res);

    expect(auth.res.statusCode).toBe(200);
    expect(auth.res.statusMessage).toEqual("OK");
    const data = auth.res._getJSONData();
    expect(data.email).toEqual(creds.email);
    const user = await User.findOne({ email: creds.email });
    expect(user?.email).toEqual(data.email);
  });

  it("should failed to deposit if user or token not found", async () => {
    const deposit = mockRequestResponseDeposit("POST", "");
    await depositHandler(deposit.req, deposit.res);

    expect(deposit.res.statusCode).toBe(404);
    const user = await User.findOne({ email: creds.email }).populate("balance");
    expect(user?.balance?.balance).toEqual(0);
  });

  it("should successfully deposit to user balance", async () => {
    const cookie = extractCookie(auth.res);

    const deposit = mockRequestResponseDeposit("POST", cookie);
    await depositHandler(deposit.req, deposit.res);

    expect(deposit.res.statusCode).toBe(200);
    expect(deposit.res.statusMessage).toEqual("OK");
    const data = deposit.res._getJSONData();
    expect(data.totalBalance).toEqual(1000);
    const user = await User.findOne({ email: creds.email }).populate("balance");
    expect(user?.balance?.balance).toEqual(data.totalBalance);
  });

  it("should failed to create item if user or token not found", async () => {
    const item = mockRequestResponseItem("POST", "", {
      name: "test",
      start_price: 100,
      duration_start: new Date(),
      duration_end: add(new Date(), { hours: 1 }),
    });
    await itemCreateHandler(item.req, item.res);

    expect(item.res.statusCode).toBe(404);
  });

  it("should failed to create item without name", async () => {
    const cookie = extractCookie(auth.res);

    const item = mockRequestResponseItem("POST", cookie, {});
    await itemCreateHandler(item.req, item.res);

    expect(item.res.statusCode).toBe(403);
  });

  it("should failed to create item without price", async () => {
    const cookie = extractCookie(auth.res);

    const item = mockRequestResponseItem("POST", cookie, { name: "test" });
    await itemCreateHandler(item.req, item.res);

    expect(item.res.statusCode).toBe(403);
  });

  it("should failed to create item without duration", async () => {
    const cookie = extractCookie(auth.res);

    const item = mockRequestResponseItem("POST", cookie, {
      name: "test",
      start_price: 100,
    });
    await itemCreateHandler(item.req, item.res);

    expect(item.res.statusCode).toBe(403);
  });

  it("should failed to create item with invalid duration", async () => {
    const cookie = extractCookie(auth.res);

    const item = mockRequestResponseItem("POST", cookie, {
      name: "test",
      start_price: 100,
      duration_start: new Date(),
      duration_end: sub(new Date(), { hours: 1 }),
    });
    await itemCreateHandler(item.req, item.res);

    expect(item.res.statusCode).toBe(403);
  });

  it("should successfully create item", async () => {
    const cookie = extractCookie(auth.res);

    const item = mockRequestResponseItem("POST", cookie, {
      name: "test",
      start_price: 100,
      duration_start: new Date(),
      duration_end: add(new Date(), { hours: 1 }),
    });
    await itemCreateHandler(item.req, item.res);

    expect(item.res.statusCode).toBe(200);
    expect(item.res.statusMessage).toEqual("OK");
    const doc = await Item.findOne({ name: "test" });
    expect(doc?.name).toEqual("test");
  });
});
