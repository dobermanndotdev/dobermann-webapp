import { appConfig } from "../config";
import {
  AccountsApiFactory,
  AuthApiFactory,
  Configuration,
  IncidentsApiFactory,
  MonitorsApiFactory,
} from "./apiClient";
import { COOKIE_AUTH_TOKEN, LOCALSTORAGE_AUTH_TOKEN } from "./contants";

export const apiClients = () => {
  const token = localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN) || "";

  const baseAuthConfig = new Configuration({ basePath: appConfig.apiUrl, accessToken: token });

  return {
    AccountsApiFactory: AccountsApiFactory(baseAuthConfig),
    MonitorsApiFactory: MonitorsApiFactory(baseAuthConfig),
    IncidentsApiFactory: IncidentsApiFactory(baseAuthConfig),
    // IAM
    AuthApiFactory: AuthApiFactory(new Configuration({ basePath: appConfig.apiUrl })),
  };
};

export const ssrApiClients = (req: any) => {
  const token = req.cookies[COOKIE_AUTH_TOKEN];
  const baseAuthConfig = new Configuration({ basePath: appConfig.apiUrl, accessToken: token });

  return {
    MonitorsApiFactory: MonitorsApiFactory(baseAuthConfig),
    AccountsApiFactory: AccountsApiFactory(baseAuthConfig),
    IncidentsApiFactory: IncidentsApiFactory(baseAuthConfig),

    // IAM
    AuthApiFactory: AuthApiFactory(new Configuration({ basePath: appConfig.apiUrl })),
  };
};
