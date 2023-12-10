"use client";

import { Alert } from "@@/common/components/Alert";
import { Heading } from "@@/common/components/Heading";
import { InputField } from "@@/common/components/Input";
import { SubmitButton } from "@@/common/components/SubmitButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { loginHandler } from "./form";

export default function LoginPage() {
  const [state, action] = useFormState(loginHandler, initialState);
  const params = useSearchParams();
  const isAccountCreated = params.get("account-created") === "1";

  return (
    <>
      <Heading>Log in to Dobbermann</Heading>
      {isAccountCreated && <Alert className="mt-4 alert-success">You account has been created successfully!</Alert>}
      <form className="mt-4 flex flex-col gap-2" action={action}>
        <InputField name="email" type="email" label="E-mail" error={state.fieldErrors.email} />
        <InputField name="password" type="password" label="Password" error={state.fieldErrors.password} />
        <SubmitButton className="btn-primary my-4">Log In</SubmitButton>
        <span className="block text-sm">
          {"Don't"} have an account? <Link href="/create-account">Create one</Link>
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
