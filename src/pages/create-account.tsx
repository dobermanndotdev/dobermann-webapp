import { Button } from "@@/common/components/Button";
import { Form } from "@@/common/components/Form";
import { FormControl } from "@@/common/components/FormControl";
import { Heading } from "@@/common/components/Heading";
import { InputField } from "@@/common/components/InputField";
import { Link } from "@@/common/components/Link";
import { Text } from "@@/common/components/Text";
import { AuthLayout } from "@@/common/layouts/AuthLayout";
import { apiClients } from "@@/common/libs/api";
import { paths } from "@@/common/libs/contants";
import { handleApiErrors, notify } from "@@/common/libs/errors";
import { formValidator } from "@@/common/libs/forms";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function CreateAccountPage() {
  const router = useRouter();

  const f = useFormik({
    validateOnChange: false,
    initialValues: { account_name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await apiClients().AuthApiFactory.createAccount(values);
        await router.push(`${paths.login}?account-created=1`);
      } catch (error) {
        notify(handleApiErrors(error), { type: "error" });
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout title="Create an account">
      <Heading mb="5">Get started with Dobermann</Heading>
      <Form className="mt-4 flex flex-col gap-2" onSubmit={f.handleSubmit}>
        <FormControl label="Account Name" error={f.errors.account_name}>
          <InputField required name="account_name" onInput={f.handleChange} />
        </FormControl>

        <FormControl label="E-mail" error={f.errors.email}>
          <InputField required name="email" type="email" onInput={f.handleChange} />
        </FormControl>

        <FormControl label="Password" error={f.errors.password}>
          <InputField required name="password" type="password" onInput={f.handleChange} />
        </FormControl>

        <Button isLoading={f.isSubmitting} disabled={f.isSubmitting} type="submit">
          Create account
        </Button>

        <Text size="2">
          Do you already have an account? <Link href="/login">Log in</Link>
        </Text>
      </Form>
    </AuthLayout>
  );
}

function validationSchema() {
  return formValidator.object().shape({
    account_name: formValidator.string().required(),
    email: formValidator.string().email().required(),
    password: formValidator.string().min(12).required(),
  });
}
