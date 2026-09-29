import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 2 7.625 6.375 12 10.75l4.375-4.375zm0 11.25-4.375 4.375L12 22l4.375-4.375zM2 12l4.375-4.375L10.75 12l-4.375 4.375zm15.625-4.375L13.25 12l4.375 4.375L22 12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 0 4.5 3.5 8 7l3.5-3.5zm0 9-3.5 3.5L8 16l3.5-3.5zM0 8l3.5-3.5L7 8l-3.5 3.5zm12.5-3.5L9 8l3.5 3.5L16 8z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 2 7.625 6.375 12 10.75l4.375-4.375zm0 11.25-4.375 4.375L12 22l4.375-4.375zM2 12l4.375-4.375L10.75 12l-4.375 4.375zm15.625-4.375L13.25 12l4.375 4.375L22 12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 0 4.5 3.5 8 7l3.5-3.5zm0 9-3.5 3.5L8 16l3.5-3.5zM0 8l3.5-3.5L7 8l-3.5 3.5zm12.5-3.5L9 8l3.5 3.5L16 8z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-accent-purple)" d="M12 2 7.625 6.375 12 10.75l4.375-4.375zm0 11.25-4.375 4.375L12 22l4.375-4.375zM2 12l4.375-4.375L10.75 12l-4.375 4.375zm15.625-4.375L13.25 12l4.375 4.375L22 12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-accent-purple)" d="M8 0 4.5 3.5 8 7l3.5-3.5zm0 9-3.5 3.5L8 16l3.5-3.5zM0 8l3.5-3.5L7 8l-3.5 3.5zm12.5-3.5L9 8l3.5 3.5L16 8z"/></> }
    }
};

export function Component({
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

Component.displayName = "Component";
