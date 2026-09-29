import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M10.25 21v-5.95L5.1 18.025 3.35 15l5.15-3-5.15-2.975L5.1 6l5.15 2.975V3h3.5v5.975L18.9 6l1.75 3.025L15.5 12l5.15 3-1.75 3.025-5.15-2.975V21z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3084)"><path fill="currentColor" d="M6.762 16v-5.738L1.81 13.119.5 10.857 5.452 8 .5 5.143 1.81 2.88l4.952 2.857V0H9.38v5.738l4.952-2.857 1.31 2.262L10.69 8l4.953 2.857-1.31 2.262-4.952-2.857V16z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M10.25 21v-5.95L5.1 18.025 3.35 15l5.15-3-5.15-2.975L5.1 6l5.15 2.975V3h3.5v5.975L18.9 6l1.75 3.025L15.5 12l5.15 3-1.75 3.025-5.15-2.975V21z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3086)"><path fill="currentColor" d="M6.762 16v-5.738L1.81 13.119.5 10.857 5.452 8 .5 5.143 1.81 2.88l4.952 2.857V0H9.38v5.738l4.952-2.857 1.31 2.262L10.69 8l4.953 2.857-1.31 2.262-4.952-2.857V16z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="M10.25 21v-5.95L5.1 18.025 3.35 15l5.15-3-5.15-2.975L5.1 6l5.15 2.975V3h3.5v5.975L18.9 6l1.75 3.025L15.5 12l5.15 3-1.75 3.025-5.15-2.975V21z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3088)"><path fill="var(--icon-critical)" d="M6.762 16v-5.738L1.81 13.119.5 10.857 5.452 8 .5 5.143 1.81 2.88l4.952 2.857V0H9.38v5.738l4.952-2.857 1.31 2.262L10.69 8l4.953 2.857-1.31 2.262-4.952-2.857V16z"/></g></> }
    }
};

export function Emergency({
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

Emergency.displayName = "Emergency";
