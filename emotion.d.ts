import { theme } from "@@/common/styles/theme";
import "@emotion/react";

declare module "@emotion/react" {
  export type Theme = typeof theme;
}
