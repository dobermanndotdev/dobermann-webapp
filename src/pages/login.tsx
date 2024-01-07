import { Alert } from "@@/common/components/Alert";
import { Button } from "@@/common/components/Button";
import { Form } from "@@/common/components/Form";
import { FormControl } from "@@/common/components/FormControl";
import { Heading } from "@@/common/components/Heading";
import { InputField } from "@@/common/components/InputField";
import { Text } from "@@/common/components/Text";
import { AuthLayout } from "@@/common/layouts/AuthLayout";
import { apiClients, ssrApiClients } from "@@/common/libs/api";
import { COOKIE_AUTH_TOKEN, LOCALSTORAGE_AUTH_TOKEN, paths } from "@@/common/libs/contants";
import { handleApiErrors, notify } from "@@/common/libs/errors";
import { FormikHelpers, useFormik } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const isAccountCreated = params.get("account-created") === "1";

  const router = useRouter();

  const handler = useCallback(
    async (values: FormFields, { setSubmitting }: FormikHelpers<FormFields>) => {
      try {
        setSubmitting(true);
        const { data } = await apiClients().AuthApiFactory.login(values);
        await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ token: data.token }),
          headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, data.token);
        router.push(paths.monitors);
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
    <AuthLayout title="Log in">
      <Heading mb="5">Log in to Dobbermann</Heading>

      {isAccountCreated && <Alert className="mt-4 alert-success">You account has been created successfully!</Alert>}

      <Form className="mt-4 flex flex-col gap-2" onSubmit={f.handleSubmit}>
        <FormControl label="E-mail" error={f.errors.email}>
          <InputField name="email" type="email" onInput={f.handleChange} />
        </FormControl>

        <FormControl label="Password" error={f.errors.password}>
          <InputField name="password" type="password" onInput={f.handleChange} />
        </FormControl>

        <Button type="submit" isLoading={f.isSubmitting} disabled={f.isSubmitting} className="btn-primary my-4">
          Log In
        </Button>
        <Text size="2">
          {"Don't"} have an account? <Link href="/create-account">Create one</Link>
        </Text>
      </Form>
    </AuthLayout>
  );
}

const initialFields = { email: "", password: "" };

type FormFields = typeof initialFields;

function validator(values: FormFields) {
  const errors: Partial<Record<keyof FormFields, string>> = {};

  if (!values.email) {
    errors.email = "E-mail cannot be empty";
  }

  if (!values.password) {
    errors.password = "Password cannot be empty";
  } else if (values.password.length < 12) {
    errors.password = "Password cannot less than 12 characters";
  }

  return errors;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies[COOKIE_AUTH_TOKEN]) {
    return { props: {} };
  }

  try {
    await ssrApiClients(req).AccountsApiFactory.getProfileDetails();

    return {
      redirect: {
        permanent: false,
        destination: paths.monitors,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};
