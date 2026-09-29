import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M6 18V6h12v12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2 14V2h12v12z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M6 18V6h12v12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2 14V2h12v12z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="M6 18V6h12v12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" d="M2 14V2h12v12z"/></> }
    }
};

export function Stop({
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

Stop.displayName = "Stop";
