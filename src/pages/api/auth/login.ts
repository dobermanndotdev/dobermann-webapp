import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  cookies.set(COOKIE_AUTH_TOKEN, req.body.token, {
    expires: Dates.new().add(7, "day").toDate(),
  });

  return res.json({ message: "Success" });
}
