import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m7.825 13 5.6 5.6L12 20l-8-8 8-8 1.425 1.4-5.6 5.6H20v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3359)"><path fill="currentColor" d="m3.825 9 5.6 5.6L8 16 0 8l8-8 1.425 1.4-5.6 5.6H16v2z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m7.825 13 5.6 5.6L12 20l-8-8 8-8 1.425 1.4-5.6 5.6H20v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3361)"><path fill="currentColor" d="m3.825 9 5.6 5.6L8 16 0 8l8-8 1.425 1.4-5.6 5.6H16v2z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="m7.825 13 5.6 5.6L12 20l-8-8 8-8 1.425 1.4-5.6 5.6H20v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3363)"><path fill="var(--icon-information)" d="m3.825 9 5.6 5.6L8 16 0 8l8-8 1.425 1.4-5.6 5.6H16v2z"/></g></> }
    }
};

export function ArrowBack({
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

ArrowBack.displayName = "ArrowBack";
