"use client";

import { Alert } from "@@/common/components/Alert";
import { InputField } from "@@/common/components/InputField";
import { Select, SelectOption } from "@@/common/components/Select";
import { SubmitButton } from "@@/common/components/SubmitButton";
import { useFormState } from "react-dom";
import { PageTitle } from "../(components)/PageTitle";
import { addMonitorHandler } from "./form";

export default function AddMonitorPage() {
  const [state, action] = useFormState(addMonitorHandler, { message: "", fieldErrors: {} });

  return (
    <>
      <PageTitle title="Add Monitor" />
      <form action={action} className="flex flex-col gap-2">
        <InputField
          name="endpoint_url"
          label="Endpoint URL*"
          placeholder="https://api.my.com/health"
          error={state.fieldErrors.endpoint_url}
        />
        <Select
          defaultValue="180"
          label="Check interval*"
          name="check_interval_in_seconds"
          error={state.fieldErrors.check_interval_in_seconds}
        >
          <SelectOption value="30">30 seconds</SelectOption>
          <SelectOption value="60">1 minute</SelectOption>
          <SelectOption value="180">3 minutes</SelectOption>
          <SelectOption value="300">5 minutes</SelectOption>
          <SelectOption value="900">15 minutes</SelectOption>
          <SelectOption value="1800">30 minutes</SelectOption>
          <SelectOption value="3600">1 hour</SelectOption>
        </Select>
        <SubmitButton className="btn-primary mt-4 w-48">Add Monitor</SubmitButton>

        {!!state.message && <Alert className="alert-error mt-4">{state.message}</Alert>}
      </form>
    </>
  );
}
