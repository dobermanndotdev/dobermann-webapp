"use client";

import { Heading } from "@@/components/Heading";
import { InputField } from "@@/components/Input";
import { SubmitButton } from "@@/components/SubmitButton";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createAccountHandler } from "./form";

export default function CreateAccountPage() {
  const [state, action] = useFormState(createAccountHandler, initialState);

  return (
    <>
      <Heading>Get started with Dobbermann</Heading>
      <form className="mt-4 flex flex-col gap-2" action={action}>
        <InputField
          name="account_name"
          label="Account Name"
          error={state.errors.account_name}
        />
        <InputField
          name="email"
          type="email"
          label="E-mail"
          error={state.errors.email}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          error={state.errors.password}
        />
        <SubmitButton className="btn-primary my-4">Create account</SubmitButton>
        <span className="block text-sm">
          Do you already have an account? <Link href="/login">Log in</Link>
        </span>
      </form>
    </>
  );
}

const initialState: { errors: Record<string, string> } = {
  errors: {},
};
