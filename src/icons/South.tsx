import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><g clip-path="url(#clip0_620_3559)"><path fill="currentColor" d="M13 2v16.175l4.6-4.575L19 15l-7 7-7-7 1.4-1.425 4.6 4.6V2z"/></g></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3566)"><path fill="currentColor" d="M8.8 0v12.94l3.68-3.66 1.12 1.12L8 16l-5.6-5.6 1.12-1.14 3.68 3.68V0z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M13 2v16.175l4.6-4.575L19 15l-7 7-7-7 1.4-1.425 4.6 4.6V2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3568)"><path fill="currentColor" d="M8.8 0v12.94l3.68-3.66 1.12 1.12L8 16l-5.6-5.6 1.12-1.14 3.68 3.68V0z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M13 2v16.175l4.6-4.575L19 15l-7 7-7-7 1.4-1.425 4.6 4.6V2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3570)"><path fill="var(--icon-information)" d="M8.8 0v12.94l3.68-3.66 1.12 1.12L8 16l-5.6-5.6 1.12-1.14 3.68 3.68V0z"/></g></> }
    }
};

export function South({
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

South.displayName = "South";
