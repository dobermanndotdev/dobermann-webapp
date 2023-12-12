import { AxiosError } from "axios";
import { ToastOptions, toast } from "react-toastify";
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

export const notify = (content: string, options?: ToastOptions) => toast(content, options);
export const notifyGenericError = () =>
  notify("Unable to complete the desired action action. Please try again.", {
    type: "error",
  });
