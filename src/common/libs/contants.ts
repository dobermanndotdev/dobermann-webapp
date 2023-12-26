export const COOKIE_AUTH_TOKEN = "DOBERMANN_AUTH_TOKEN";
export const LOCALSTORAGE_AUTH_TOKEN = "DOBERMANN_AUTH_TOKEN";
export const SESSION_STORAGE_USER_DETAILS = "DOBERMANN_USER_DETAILS";

export const paths = {
  monitors: "/dashboard/monitors",
  addMonitor: "/dashboard/monitors/add",
  incidents: "/dashboard/incidents",

  // auth
  login: "/login",
  createAccount: "/create-account",

  // helpers
  toEditMonitor: (id: string) => `/dashboard/monitors/${id}/edit`,
  toIncident: (id: string) => `/dashboard/incidents/${id}`,
};
