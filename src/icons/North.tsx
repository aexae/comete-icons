import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><g clipPath="url(#clip0_620_3541)"><path fill="currentColor" d="M11 22V5.825L6.4 10.4 5 9l7-7 7 7-1.4 1.425-4.6-4.6V22z"/></g><defs><clipPath id="clip0_620_3541"><path fill="currentColor" d="M0 0h24v24H0z"/></clipPath></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.2 16V3.06L3.52 6.72 2.4 5.6 8 0l5.6 5.6-1.12 1.14L8.8 3.06V16z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 22V5.825L6.4 10.4 5 9l7-7 7 7-1.4 1.425-4.6-4.6V22z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.2 16V3.06L3.52 6.72 2.4 5.6 8 0l5.6 5.6-1.12 1.14L8.8 3.06V16z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M11 22V5.825L6.4 10.4 5 9l7-7 7 7-1.4 1.425-4.6-4.6V22z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" d="M7.2 16V3.06L3.52 6.72 2.4 5.6 8 0l5.6 5.6-1.12 1.14L8.8 3.06V16z"/></> }
    }
};

export function North({
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

North.displayName = "North";
