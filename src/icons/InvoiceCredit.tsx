import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.7 22q-1.11 0-1.889-.875-.777-.875-.778-2.125v-3H6.7V2l1.333 1.5L9.367 2 10.7 3.5 12.033 2l1.334 1.5L14.7 2l1.333 1.5L17.367 2 18.7 3.5 20.033 2v17q0 1.25-.777 2.125-.778.875-1.89.875zm10.667-2a.81.81 0 0 0 .633-.288q.255-.287.256-.712V5H8.478v11h8v3q0 .424.255.712.256.288.634.288M6.7 20h8v-2H5.811v1q0 .424.256.712.255.288.633.288" clipRule="evenodd"/><path fill="currentColor" d="m9.633 12.167 1.37 1.4 2.248-2.3 2.25 2.3 1.368-1.4-2.249-2.3 2.249-2.3-1.369-1.4-2.249 2.3-2.249-2.3-1.369 1.4 2.25 2.3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.222 16q-.926 0-1.574-.7T1 13.6v-2.4h2.222V0l1.111 1.2L5.444 0l1.112 1.2L7.666 0l1.112 1.2L9.888 0 11 1.2 12.111 0l1.111 1.2L14.333 0v13.6q0 1-.648 1.7t-1.574.7zm8.89-1.6a.7.7 0 0 0 .527-.23.8.8 0 0 0 .213-.57V2.4H4.704v8.8h6.666v2.4q0 .34.213.57a.7.7 0 0 0 .528.23m-8.89 0H9.89v-1.6H2.48v.8q0 .34.213.57a.7.7 0 0 0 .528.23" clipRule="evenodd"/><path fill="currentColor" d="m5.667 8.133 1.14 1.12 1.874-1.84 1.875 1.84 1.14-1.12-1.874-1.84 1.874-1.84-1.14-1.12-1.875 1.84-1.874-1.84-1.14 1.12 1.874 1.84z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.867 22q-1.18 0-2.007-.875-.825-.875-.826-2.125v-3h2.833V2l1.417 1.5L9.7 2l1.417 1.5L12.534 2l1.416 1.5L15.367 2l1.417 1.5L18.2 2l1.417 1.5L21.034 2v17q0 1.25-.827 2.125Q19.381 22 18.2 22zM18.2 20a.9.9 0 0 0 .673-.288 1 1 0 0 0 .272-.712V5H8.755v11h8.5v3q0 .424.272.712A.9.9 0 0 0 18.2 20" clipRule="evenodd"/><path fill="currentColor" d="m9.984 12.167 1.454 1.4 2.39-2.3 2.389 2.3 1.455-1.4-2.39-2.3 2.39-2.3-1.455-1.4-2.39 2.3-2.389-2.3-1.454 1.4 2.39 2.3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.222 16q-.926 0-1.574-.7T1 13.6v-2.4h2.222V0l1.111 1.2L5.444 0l1.112 1.2L7.666 0l1.112 1.2L9.888 0 11 1.2 12.111 0l1.111 1.2L14.333 0v13.6q0 1-.648 1.7t-1.574.7zm8.89-1.6a.7.7 0 0 0 .527-.23.8.8 0 0 0 .213-.57V2.4H4.704v8.8h6.666v2.4q0 .34.213.57a.7.7 0 0 0 .528.23" clipRule="evenodd"/><path fill="currentColor" d="m5.667 8.133 1.14 1.12 1.874-1.84 1.875 1.84 1.14-1.12-1.874-1.84 1.874-1.84-1.14-1.12-1.875 1.84-1.874-1.84-1.14 1.12 1.874 1.84z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.867 22q-1.18 0-2.007-.875-.825-.875-.826-2.125v-3h2.833V2l1.417 1.5L9.7 2l1.417 1.5L12.534 2l1.416 1.5L15.367 2l1.417 1.5L18.2 2l1.417 1.5L21.034 2v17q0 1.25-.827 2.125Q19.381 22 18.2 22zM18.2 20a.9.9 0 0 0 .673-.288 1 1 0 0 0 .272-.712V5H8.755v11h8.5v3q0 .424.272.712A.9.9 0 0 0 18.2 20M6.867 20h8.5v-2H5.923v1q0 .424.271.712a.9.9 0 0 0 .673.288" clipRule="evenodd"/><path fill="var(--icon-critical)" d="m9.984 12.167 1.454 1.4 2.39-2.3 2.389 2.3 1.455-1.4-2.39-2.3 2.39-2.3-1.455-1.4-2.39 2.3-2.389-2.3-1.454 1.4 2.39 2.3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.222 16q-.926 0-1.574-.7T1 13.6v-2.4h2.222V0l1.111 1.2L5.444 0l1.112 1.2L7.666 0l1.112 1.2L9.888 0 11 1.2 12.111 0l1.111 1.2L14.333 0v13.6q0 1-.648 1.7t-1.574.7zm8.89-1.6a.7.7 0 0 0 .527-.23.8.8 0 0 0 .213-.57V2.4H4.704v8.8h6.666v2.4q0 .34.213.57a.7.7 0 0 0 .528.23m-8.89 0H9.89v-1.6H2.48v.8q0 .34.213.57a.7.7 0 0 0 .528.23" clipRule="evenodd"/><path fill="var(--icon-critical)" d="m5.667 8.133 1.14 1.12 1.874-1.84 1.875 1.84 1.14-1.12-1.874-1.84 1.874-1.84-1.14-1.12-1.875 1.84-1.874-1.84-1.14 1.12 1.874 1.84z"/></> }
    }
};

export function InvoiceCredit({
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

InvoiceCredit.displayName = "InvoiceCredit";
