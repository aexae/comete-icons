import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><g clipPath="url(#clip0_620_3577)"><path fill="currentColor" d="M2 11h16.175L13.6 6.4 15 5l7 7-7 7-1.425-1.4 4.6-4.6H2z"/></g><defs><clipPath id="clip0_620_3577"><path fill="currentColor" d="M24 0v24H0V0z"/></clipPath></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M0 7.2h12.94L9.28 3.52 10.4 2.4 16 8l-5.6 5.6-1.14-1.12 3.68-3.68H0z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M2 11h16.175L13.6 6.4 15 5l7 7-7 7-1.425-1.4 4.6-4.6H2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M0 7.2h12.94L9.28 3.52 10.4 2.4 16 8l-5.6 5.6-1.14-1.12 3.68-3.68H0z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M2 11h16.175L13.6 6.4 15 5l7 7-7 7-1.425-1.4 4.6-4.6H2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" d="M0 7.2h12.94L9.28 3.52 10.4 2.4 16 8l-5.6 5.6-1.14-1.12 3.68-3.68H0z"/></> }
    }
};

export function East({
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

East.displayName = "East";
