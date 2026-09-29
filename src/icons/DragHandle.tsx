import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3 15.75V13.5h18v2.25zm0-4.5V9h18v2.25z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M0 11V9h16v2zm0-4V5h16v2z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3 15.75V13.5h18v2.25zm0-4.5V9h18v2.25z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M0 11V9h16v2zm0-4V5h16v2z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-subtlest)" d="M3 15.75V13.5h18v2.25zm0-4.5V9h18v2.25z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-subtlest)" d="M0 11V9h16v2zm0-4V5h16v2z"/></> }
    }
};

export function DragHandle({
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

DragHandle.displayName = "DragHandle";
