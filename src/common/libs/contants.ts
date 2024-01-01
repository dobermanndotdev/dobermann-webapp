export const COOKIE_AUTH_TOKEN = "DOBERMANN_AUTH_TOKEN";
export const LOCALSTORAGE_AUTH_TOKEN = "DOBERMANN_AUTH_TOKEN";
export const SESSION_STORAGE_USER_DETAILS = "DOBERMANN_USER_DETAILS";
export const FULL_DATE_FORMAT = "ddd, MMM D, YYYY h:mm:ss A";

export const paths = {
  home: "/dashboard/get-started",
  monitors: "/dashboard/monitors",
  addMonitor: "/dashboard/monitors/add",
  incidents: "/dashboard/incidents",

  // auth
  login: "/login",
  createAccount: "/create-account",

  // helpers
  toMonitor: (id: string) => `/dashboard/monitors/${id}`,
  toEditMonitor: (id: string) => `/dashboard/monitors/${id}/edit`,
  toIncident: (id: string) => `/dashboard/incidents/${id}`,
};
