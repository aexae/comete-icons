import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 21v-6h2v2h8v2h-8v2zm-8-2v-2h6v2zm4-4v-2H3v-2h4V9h2v6zm4-2v-2h10v2zm4-4V3h2v2h4v2h-4v2zM3 7V5h10v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.111 16v-5.333H8.89v1.777H16v1.778H8.889V16zM0 14.222v-1.778h5.333v1.778zm3.556-3.555V8.889H0V7.11h3.556V5.333h1.777v5.334zM7.11 8.889V7.11H16v1.78zm3.556-3.556V0h1.777v1.778H16v1.778h-3.556v1.777zM0 3.556V1.778h8.889v1.778z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 21v-6h2v2h8v2h-8v2zm-8-2v-2h6v2zm4-4v-2H3v-2h4V9h2v6zm4-2v-2h10v2zm4-4V3h2v2h4v2h-4v2zM3 7V5h10v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.111 16v-5.333H8.89v1.777H16v1.778H8.889V16zM0 14.222v-1.778h5.333v1.778zm3.556-3.555V8.889H0V7.11h3.556V5.333h1.777v5.334zM7.11 8.889V7.11H16v1.78zm3.556-3.556V0h1.777v1.778H16v1.778h-3.556v1.777zM0 3.556V1.778h8.889v1.778z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M11 21v-6h2v2h8v2h-8v2zm-8-2v-2h6v2zm4-4v-2H3v-2h4V9h2v6zm4-2v-2h10v2zm4-4V3h2v2h4v2h-4v2zM3 7V5h10v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" d="M7.111 16v-5.333H8.89v1.777H16v1.778H8.889V16zM0 14.222v-1.778h5.333v1.778zm3.556-3.555V8.889H0V7.11h3.556V5.333h1.777v5.334zM7.11 8.889V7.11H16v1.78zm3.556-3.556V0h1.777v1.778H16v1.778h-3.556v1.777zM0 3.556V1.778h8.889v1.778z"/></> }
    }
};

export function Tune({
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

Tune.displayName = "Tune";
