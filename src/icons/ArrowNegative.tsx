import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M13 4v12.175l5.6-5.6L20 12l-8 8-8-8 1.4-1.425 5.6 5.6V4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3410)"><path fill="currentColor" d="M9 0v12.175l5.6-5.6L16 8l-8 8-8-8 1.4-1.425 5.6 5.6V0z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M13 4v12.175l5.6-5.6L20 12l-8 8-8-8 1.4-1.425 5.6 5.6V4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3412)"><path fill="currentColor" d="M9 0v12.175l5.6-5.6L16 8l-8 8-8-8 1.4-1.425 5.6 5.6V0z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="M13 4v12.175l5.6-5.6L20 12l-8 8-8-8 1.4-1.425 5.6 5.6V4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3414)"><path fill="var(--icon-critical)" d="M9 0v12.175l5.6-5.6L16 8l-8 8-8-8 1.4-1.425 5.6 5.6V0z"/></g></> }
    }
};

export function ArrowNegative({
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

ArrowNegative.displayName = "ArrowNegative";
