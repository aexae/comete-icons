import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M7 20V7H2V4h13v3h-5v13zm9 0v-8h-3V9h9v3h-3v8z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M4 14V3.438H0V1h10.4v2.438h-4V14zm7.2 0V7.5H8.8V5.063H16V7.5h-2.4V14z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M7 20V7H2V4h13v3h-5v13zm9 0v-8h-3V9h9v3h-3v8z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M4 14V3.438H0V1h10.4v2.438h-4V14zm7.2 0V7.5H8.8V5.063H16V7.5h-2.4V14z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M7 20V7H2V4h13v3h-5v13zm9 0v-8h-3V9h9v3h-3v8z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" d="M4 14V3.438H0V1h10.4v2.438h-4V14zm7.2 0V7.5H8.8V5.063H16V7.5h-2.4V14z"/></> }
    }
};

export function TextFields({
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

TextFields.displayName = "TextFields";
