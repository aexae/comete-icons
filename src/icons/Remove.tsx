import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M5 14v-3h14v3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2 9V7h12v2z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M5 14v-3h14v3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2 9V7h12v2z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="M5 14v-3h14v3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" d="M2 9V7h12v2z"/></> }
    }
};

export function Remove({
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

Remove.displayName = "Remove";
