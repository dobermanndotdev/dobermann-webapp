import { appConfig } from "@@/app/config";
import { Configuration, MonitorsApiFactory } from "./apiClient";
import { LOCALSTORAGE_AUTH_TOKEN } from "./contants";

let token = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN) || "";
}

export const apiClients = {
  MonitorsApiFactory: MonitorsApiFactory(new Configuration({ basePath: appConfig.apiUrl, accessToken: token })),
};
