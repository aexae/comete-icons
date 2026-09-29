import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.667 22q-1.11 0-1.889-.875Q4.001 20.25 4 19v-3h2.667V2L8 3.5 9.334 2l1.333 1.5L12 2l1.334 1.5L14.667 2 16 3.5 17.334 2l1.333 1.5L20 2v17q0 1.25-.777 2.125-.78.875-1.89.875zm10.667-2a.81.81 0 0 0 .633-.288q.256-.287.256-.712V5H8.445v11h8v3q0 .424.255.712.256.288.634.288M6.667 20h8v-2H5.778v1q0 .424.256.712.255.288.633.288" clipRule="evenodd"/><path fill="currentColor" d="m12.516 12.417 4.257-4.31L15.681 7l-3.184 3.223-1.583-1.602L9.84 9.708z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.222 16q-.926 0-1.574-.7T1 13.6v-2.4h2.222V0l1.111 1.2L5.444 0l1.112 1.2L7.666 0l1.112 1.2L9.888 0 11 1.2 12.111 0l1.111 1.2L14.333 0v13.6q0 1-.648 1.7t-1.574.7zm8.89-1.6a.7.7 0 0 0 .527-.23.8.8 0 0 0 .213-.57V2.4H4.704v8.8h6.666v2.4q0 .34.213.57a.7.7 0 0 0 .528.23m-8.89 0H9.89v-1.6H2.48v.8q0 .34.213.57a.7.7 0 0 0 .528.23" clipRule="evenodd"/><path fill="currentColor" d="m8.096 8.333 3.548-3.448-.91-.885L8.08 6.579 6.761 5.297l-.894.87z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.667 22q-1.11 0-1.89-.875Q4 20.25 4 19v-3h2.667V2L8 3.5 9.333 2l1.334 1.5L12 2l1.333 1.5L14.667 2 16 3.5 17.333 2l1.334 1.5L20 2v17q0 1.25-.778 2.125-.777.875-1.889.875zm10.666-2a.81.81 0 0 0 .634-.288q.255-.287.255-.712V5H8.444v11h8v3q0 .424.256.712.255.288.633.288" clipRule="evenodd"/><path fill="currentColor" d="m12.515 12.417 4.258-4.31L15.68 7l-3.184 3.223-1.582-1.602L9.84 9.708z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.222 16q-.926 0-1.574-.7T1 13.6v-2.4h2.222V0l1.111 1.2L5.444 0l1.112 1.2L7.666 0l1.112 1.2L9.888 0 11 1.2 12.111 0l1.111 1.2L14.333 0v13.6q0 1-.648 1.7t-1.574.7zm8.89-1.6a.7.7 0 0 0 .527-.23.8.8 0 0 0 .213-.57V2.4H4.704v8.8h6.666v2.4q0 .34.213.57a.7.7 0 0 0 .528.23" clipRule="evenodd"/><path fill="currentColor" d="m8.096 8.333 3.548-3.448-.91-.885L8.08 6.579 6.761 5.297l-.894.87z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.667 22q-1.11 0-1.89-.875Q4 20.25 4 19v-3h2.667V2L8 3.5 9.333 2l1.334 1.5L12 2l1.333 1.5L14.667 2 16 3.5 17.333 2l1.334 1.5L20 2v17q0 1.25-.778 2.125-.777.875-1.889.875zm10.666-2a.81.81 0 0 0 .634-.288q.255-.287.255-.712V5H8.444v11h8v3q0 .424.256.712.255.288.633.288M6.667 20h8v-2h-8.89v1q0 .424.256.712.255.288.634.288" clipRule="evenodd"/><path fill="var(--icon-success)" d="m12.515 12.417 4.258-4.31L15.68 7l-3.184 3.223-1.582-1.602L9.84 9.708z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.222 16q-.926 0-1.574-.7T1 13.6v-2.4h2.222V0l1.111 1.2L5.444 0l1.112 1.2L7.666 0l1.112 1.2L9.888 0 11 1.2 12.111 0l1.111 1.2L14.333 0v13.6q0 1-.648 1.7t-1.574.7zm8.89-1.6a.7.7 0 0 0 .527-.23.8.8 0 0 0 .213-.57V2.4H4.704v8.8h6.666v2.4q0 .34.213.57a.7.7 0 0 0 .528.23m-8.89 0H9.89v-1.6H2.48v.8q0 .34.213.57a.7.7 0 0 0 .528.23" clipRule="evenodd"/><path fill="var(--icon-success)" d="m8.096 8.333 3.548-3.448-.91-.885L8.08 6.579 6.761 5.297l-.894.87z"/></> }
    }
};

export function ValidatedInvoices({
  size = 24,
  spacing = "default",
  variant = "outlined",
  color = "default",
  className,
  ...props
}: IconProps) {
  const data = svgData[variant]?.[spacing] ?? svgData.outlined?.["default"];
  if (!data) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={data.viewBox}
      fill="none"
      className={`${getIconClass(color)}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      {...props}
    >
      {data.paths}
    </svg>
  );
}

ValidatedInvoices.displayName = "ValidatedInvoices";
