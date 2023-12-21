import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  cookies.set(COOKIE_AUTH_TOKEN, "", { expires: new Date() });
  return res.json({ message: "Success" });
}
