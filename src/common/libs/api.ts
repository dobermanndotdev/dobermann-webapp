import { appConfig } from "../config";
import { AuthApiFactory, Configuration, MonitorsApiFactory } from "./apiClient";
import { COOKIE_AUTH_TOKEN, LOCALSTORAGE_AUTH_TOKEN } from "./contants";

export const apiClients = () => {
  const token = localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN) || "";
  return {
    AuthApiFactory: AuthApiFactory(new Configuration({ basePath: appConfig.apiUrl })),
    MonitorsApiFactory: MonitorsApiFactory(new Configuration({ basePath: appConfig.apiUrl, accessToken: token })),
  };
};

export const ssrApiClients = (req: any) => {
  const token = req.cookies[COOKIE_AUTH_TOKEN];

  return {
    AuthApiFactory: AuthApiFactory(new Configuration({ basePath: appConfig.apiUrl })),
    MonitorsApiFactory: MonitorsApiFactory(new Configuration({ basePath: appConfig.apiUrl, accessToken: token })),
  };
};
