import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><g clipPath="url(#clip0_620_3595)"><path fill="currentColor" d="M22 13H5.825l4.575 4.6L9 19l-7-7 7-7 1.425 1.4-4.6 4.6H22z"/></g><defs><clipPath id="clip0_620_3595"><path fill="currentColor" d="M0 24V0h24v24z"/></clipPath></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M16 8.8H3.06l3.66 3.68L5.6 13.6 0 8l5.6-5.6 1.14 1.12L3.06 7.2H16z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M22 13H5.825l4.575 4.6L9 19l-7-7 7-7 1.425 1.4-4.6 4.6H22z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M16 8.8H3.06l3.66 3.68L5.6 13.6 0 8l5.6-5.6 1.14 1.12L3.06 7.2H16z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M22 13H5.825l4.575 4.6L9 19l-7-7 7-7 1.425 1.4-4.6 4.6H22z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" d="M16 8.8H3.06l3.66 3.68L5.6 13.6 0 8l5.6-5.6 1.14 1.12L3.06 7.2H16z"/></> }
    }
};

export function West({
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

West.displayName = "West";
