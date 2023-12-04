import { AxiosError } from "axios";
import { typeToFlattenedError } from "zod";

export function mapFormErrors(formErrors: typeToFlattenedError<Record<string, string>, string>) {
  const errors: Record<string, string> = {};

  Object.keys(formErrors.fieldErrors).forEach((key) => {
    const val = formErrors.fieldErrors[key];
    if (val?.length) {
      errors[key] = val[0];
    }
  });

  return errors;
}

export function handleApiErrors(error: unknown): string {
  const err = error as AxiosError;

  if (err.response && err.response.data) {
    return (err.response.data as { message: string }).message;
  }

  return "";
}
