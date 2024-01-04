import { AxiosError } from "axios";
import { ToastOptions, toast } from "react-toastify";

const apiErrors: Record<string, string> = {
  "email-in-use": "The email address provided is in use.",
  "validation-error": "Please verify if all fields have been filled correctly.",
  "unable-to-create-account":
    "Due to an unexpected error we were unable to create an account now, please try again later.",
  unknown: "An error occurred, please try again.",
};

export function handleApiErrors(error: unknown): string {
  const err = error as AxiosError;

  if (err.response && err.response.data) {
    const key = (err.response.data as { error: string }).error;
    return apiErrors[key] || apiErrors.unknown;
  }

  return apiErrors.unknown;
}

export const notify = (content: string, options?: ToastOptions) => toast(content, options);
export const notifyGenericError = () =>
  notify("Unable to complete the desired action action. Please try again.", {
    type: "error",
  });
