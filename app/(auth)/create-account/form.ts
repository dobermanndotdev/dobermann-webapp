"use server";

import { appConfig } from "@@/app/config";
import { mapFormErrors } from "@@/common/libs";
import { AuthApiFactory } from "@@/common/libs/apiClient";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email(),
    account_name: z.string().min(3),
    password: z.string().min(12).max(64),
  })
  .required();

export async function createAccountHandler(prevState: unknown, fields: FormData) {
  const result = schema.safeParse({
    email: fields.get("email"),
    password: fields.get("password"),
    account_name: fields.get("account_name"),
  });

  if (!result.success) {
    return { fieldErrors: mapFormErrors(result.error.formErrors), message: "" };
  }

  try {
    await AuthApiFactory(undefined, appConfig.apiUrl).createAccount(result.data);
  } catch (error) {
    //TODO: Handle this error properly
    return { fieldErrors: {}, message: "An error occurred, please try again" };
  }

  redirect("/login?account-created=1");
}
