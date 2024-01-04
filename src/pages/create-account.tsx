import { Button } from "@@/common/components/Button";
import { FormControl } from "@@/common/components/FormControl";
import { Heading } from "@@/common/components/Heading";
import { InputField } from "@@/common/components/InputField";
import { AuthLayout } from "@@/common/layouts/AuthLayout";
import { apiClients } from "@@/common/libs/api";
import { paths } from "@@/common/libs/contants";
import { handleApiErrors, notify } from "@@/common/libs/errors";
import { FormikHelpers, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function CreateAccountPage() {
  const router = useRouter();

  const handler = useCallback(
    async (values: FormFields, { setSubmitting }: FormikHelpers<FormFields>) => {
      try {
        setSubmitting(true);
        await apiClients().AuthApiFactory.createAccount(values);
        router.push(`${paths.login}?account-created=1`);
      } catch (error) {
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
    <AuthLayout title="Create an account">
      <Heading>Get started with Dobbermann</Heading>
      <form className="mt-4 flex flex-col gap-2" onSubmit={f.handleSubmit}>
        <FormControl label="Account Name" error={f.errors.account_name}>
          <InputField name="account_name" onInput={f.handleChange} />
        </FormControl>

        <FormControl label="E-mail" error={f.errors.email}>
          <InputField name="email" type="email" onInput={f.handleChange} />
        </FormControl>

        <FormControl label="Password" error={f.errors.password}>
          <InputField name="password" type="password" onInput={f.handleChange} />
        </FormControl>

        <Button isLoading={f.isSubmitting} disabled={f.isSubmitting} type="submit">
          Create account
        </Button>

        <span className="block text-sm">
          Do you already have an account? <Link href="/login">Log in</Link>
        </span>
      </form>
    </AuthLayout>
  );
}

const initialFields = { account_name: "", email: "", password: "" };

type FormFields = typeof initialFields;

function validator(values: FormFields) {
  const errors: Partial<Record<keyof FormFields, string>> = {};
  if (!values.account_name) {
    errors.account_name = "Account name cannot be empty";
  }

  if (!values.email) {
    errors.email = "Account name cannot be empty";
  }

  if (!values.password) {
    errors.password = "Account name cannot be empty";
  }

  return errors;
}
