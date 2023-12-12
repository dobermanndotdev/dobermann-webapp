"use client";

import { Alert } from "@@/common/components/Alert";
import { Heading } from "@@/common/components/Heading";
import { InputField } from "@@/common/components/InputField";
import { SubmitButton } from "@@/common/components/SubmitButton";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createAccountHandler } from "./form";

export default function CreateAccountPage() {
  const [state, action] = useFormState(createAccountHandler, initialState);

  return (
    <>
      <Heading>Get started with Dobbermann</Heading>
      <form className="mt-4 flex flex-col gap-2" action={action}>
        <InputField name="account_name" label="Account Name" error={state.fieldErrors.account_name} />
        <InputField name="email" type="email" label="E-mail" error={state.fieldErrors.email} />
        <InputField name="password" type="password" label="Password" error={state.fieldErrors.password} />
        <SubmitButton className="btn-primary my-4">Create account</SubmitButton>
        <span className="block text-sm">
          Do you already have an account? <Link href="/login">Log in</Link>
        </span>

        {!!state.message && <Alert className="alert-error mt-4">{state.message}</Alert>}
      </form>
    </>
  );
}

interface State {
  message: string;
  fieldErrors: Record<string, string>;
}

const initialState: State = {
  message: "",
  fieldErrors: {},
};
