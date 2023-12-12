"use server";

import { appConfig } from "@@/app/config";
import { AuthApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { mapFormErrors } from "@@/common/libs/errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(12).max(64),
  })
  .required();

export async function loginHandler(prevState: unknown, fields: FormData) {
  const result = schema.safeParse({
    email: fields.get("email"),
    password: fields.get("password"),
  });

  if (!result.success) {
    return { fieldErrors: mapFormErrors(result.error.formErrors), message: "" };
  }

  try {
    const resp = await AuthApiFactory(undefined, appConfig.apiUrl).login(result.data);
    cookies().set(COOKIE_AUTH_TOKEN, resp.data.token, {
      maxAge: 7 * 86400, // 7 days
    });
  } catch (error) {
    //TODO: Handle this error properly
    return { fieldErrors: {}, message: "An error occurred, please try again" };
  }

  redirect("/dashboard/monitors");
}
