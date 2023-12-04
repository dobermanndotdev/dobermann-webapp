"use client";

import { Alert } from "@@/common/components/Alert";
import { InputField } from "@@/common/components/Input";
import { SubmitButton } from "@@/common/components/SubmitButton";
import { useFormState } from "react-dom";
import { ViewHeader } from "../(components)/ViewHeader";
import { addMonitorHandler } from "./form";

export default function AddMonitorPage() {
  const [state, action] = useFormState(addMonitorHandler, { message: "", fieldErrors: {} });

  return (
    <>
      <ViewHeader title="Add Monitor" />
      <form action={action}>
        <InputField error={state.fieldErrors.endpoint_url} name="endpoint_url" label="Endpoint URL" />
        <SubmitButton className="btn-primary mt-4">Add Monitor</SubmitButton>

        {!!state.message && <Alert className="alert-error mt-4">{state.message}</Alert>}
      </form>
    </>
  );
}
