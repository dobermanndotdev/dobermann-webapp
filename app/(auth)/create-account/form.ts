import { mapFormErrors } from "@@/libs";
import { z } from "zod";

const schema = z
  .object({
    account_name: z.string().min(3),
    email: z.string().email(),
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
    return { errors: mapFormErrors(result.error.formErrors) };
  }

  return { errors: {} };
}
