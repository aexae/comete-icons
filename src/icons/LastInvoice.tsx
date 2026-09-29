import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M16.52 21V3h3.375v18zm-9.63 0L4.5 18.61 11.11 12 4.5 5.39 6.89 3l9 9z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M11.014 14V2h2.25v12zm-6.42 0L3 12.406 7.406 8 3 3.594 4.594 2l6 6z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M16.52 21V3h3.375v18zm-9.63 0L4.5 18.61 11.11 12 4.5 5.39 6.89 3l9 9z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M11.014 14V2h2.25v12zm-6.42 0L3 12.406 7.406 8 3 3.594 4.594 2l6 6z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-success)" d="M16.52 21V3h3.375v18z"/><path fill="currentColor" d="M6.89 21 4.5 18.61 11.11 12 4.5 5.39 6.89 3l9 9z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-success)" d="M11.014 14V2h2.25v12z"/><path fill="currentColor" d="M4.594 14 3 12.406 7.406 8 3 3.594 4.594 2l6 6z"/></> }
    }
};

export function LastInvoice({
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

LastInvoice.displayName = "LastInvoice";
