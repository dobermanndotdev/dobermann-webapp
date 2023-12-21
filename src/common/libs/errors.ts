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

const apiErrors: Record<string, string> = {
  "email-in-use": "The email address provided is in use.",
};

export function handleApiErrors(error: unknown): string {
  const err = error as AxiosError;

  if (err.response && err.response.data) {
    const key = (err.response.data as { error: string }).error;
    return apiErrors[key];
  }

  return "An error occurred, please try again.";
}

export const notify = (content: string, options?: ToastOptions) => toast(content, options);
export const notifyGenericError = () =>
  notify("Unable to complete the desired action action. Please try again.", {
    type: "error",
  });
