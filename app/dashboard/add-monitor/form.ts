"use server";

import { appConfig } from "@@/app/config";
import { handleApiErrors, mapFormErrors } from "@@/common/libs";
import { Configuration, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  endpoint_url: z.string().url(),
  check_interval_in_seconds: z.string().refine((value) => {
    const n = Number(value);
    return !isNaN(n) && (n >= 30 || n <= 3600);
  }),
});

export async function addMonitorHandler(prevState: unknown, fields: FormData) {
  const result = schema.safeParse({
    endpoint_url: fields.get("endpoint_url"),
    check_interval_in_seconds: fields.get("check_interval_in_seconds"),
  });
  if (!result.success) {
    return { fieldErrors: mapFormErrors(result.error.formErrors), message: "" };
  }

  try {
    const token = cookies().get(COOKIE_AUTH_TOKEN);
    const client = MonitorsApiFactory(new Configuration({ accessToken: token?.value, basePath: appConfig.apiUrl }));

    await client.createMonitor(result.data);
  } catch (error) {
    return { fieldErrors: {}, message: handleApiErrors(error) };
  }

  redirect("/dashboard/monitors");
}
