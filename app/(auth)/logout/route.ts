import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { cookies } from "next/headers";

export async function DELETE(request: Request) {
  cookies().delete(COOKIE_AUTH_TOKEN);
  return Response.json({ message: "Success" });
}
