import { Button } from "@@/common/components/Button";
import { InputField } from "@@/common/components/InputField";
import { PageTitle } from "@@/common/components/PageTitle";
import { Select, SelectOption } from "@@/common/components/Select";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { apiClients } from "@@/common/libs/api";
import { paths } from "@@/common/libs/contants";
import { handleApiErrors, notify } from "@@/common/libs/errors";
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function AddMonitorPage() {
  const router = useRouter();

  const handler = useCallback(
    async (values: FormFields, { setSubmitting }: FormikHelpers<FormFields>) => {
      try {
        setSubmitting(true);
        await apiClients().MonitorsApiFactory.createMonitor({
          ...values,
          check_interval_in_seconds: Number(values.check_interval_in_seconds),
        });
        router.push(paths.monitors);
      } catch (error) {
        console.log(error);
        notify(handleApiErrors(error), { type: "error" });
        setSubmitting(false);
      }
    },
    [router]
  );

  const f = useFormik({
    onSubmit: handler,
    validate: validator,
    initialValues: initialFields,
  });

  return (
    <DashboardLayout title="Add monitor">
      <PageTitle title="Add Monitor" />
      <form className="flex flex-col gap-2" onSubmit={f.handleSubmit}>
        <InputField
          name="endpoint_url"
          label="Endpoint URL*"
          onInput={f.handleChange}
          error={f.errors.endpoint_url}
          placeholder="https://api.my.com/health"
        />
        <Select
          defaultValue="180"
          label="Check interval*"
          onChange={f.handleChange}
          name="check_interval_in_seconds"
          error={f.errors.check_interval_in_seconds}
        >
          <SelectOption value="30">30 seconds</SelectOption>
          <SelectOption value="60">1 minute</SelectOption>
          <SelectOption value="180">3 minutes</SelectOption>
          <SelectOption value="300">5 minutes</SelectOption>
          <SelectOption value="900">15 minutes</SelectOption>
          <SelectOption value="1800">30 minutes</SelectOption>
          <SelectOption value="3600">1 hour</SelectOption>
        </Select>
        <Button type="submit" isLoading={f.isSubmitting} disabled={f.isSubmitting} className="btn-primary mt-4 w-48">
          Add Monitor
        </Button>
      </form>
    </DashboardLayout>
  );
}

const initialFields = { check_interval_in_seconds: 180, endpoint_url: "" };

type FormFields = typeof initialFields;

function validator(values: FormFields) {
  const errors: Partial<Record<keyof FormFields, string>> = {};

  if (!values.endpoint_url) {
    errors.endpoint_url = "Endpoint URL cannot be empty";
  }

  if (!values.check_interval_in_seconds) {
    errors.check_interval_in_seconds = "Check interval cannot be empty";
  }

  return errors;
}
