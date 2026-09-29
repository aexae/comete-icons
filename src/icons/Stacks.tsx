import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 14 1 8l11-6 11 6zm0 4L1.575 12.325l2.1-1.15L12 15.725l8.325-4.55 2.1 1.15zm0 4L1.575 16.325l2.1-1.15L12 19.725l8.325-4.55 2.1 1.15zm0-10.275L18.825 8 12 4.275 5.175 8z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 9.427 0 5.064 8 .7l8 4.364zm0 2.91L.418 8.208l1.527-.836L8 10.682l6.055-3.31 1.527.837zm0 2.909L.418 11.118l1.527-.836L8 13.59l6.055-3.31 1.527.837zm0-7.473 4.964-2.71L8 2.356 3.036 5.064z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 14 1 8l11-6 11 6zm0 4L1.575 12.325l2.1-1.15L12 15.725l8.325-4.55 2.1 1.15zm0 4L1.575 16.325l2.1-1.15L12 19.725l8.325-4.55 2.1 1.15z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 9.427 0 5.064 8 .7l8 4.364zm0 2.91L.418 8.209l1.527-.836L8 10.682l6.055-3.31 1.527.837zm0 2.909L.418 11.118l1.527-.836L8 13.592l6.055-3.31 1.527.836z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-accent-purple)" fillRule="evenodd" d="M1.575 12.325 12 18l10.425-5.675-2.1-1.15L12 15.725l-8.325-4.55zm0 4L12 22l10.425-5.675-2.1-1.15L12 19.725l-8.325-4.55z" clipRule="evenodd"/><path fill="var(--icon-accent-purple)" fillRule="evenodd" d="M12 14 1 8l11-6 11 6zm6.825-6L12 11.725 5.175 8 12 4.275z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-accent-purple)" fillRule="evenodd" d="M.418 8.21 8 12.336l7.582-4.128-1.527-.836L8 10.682l-6.055-3.31zm0 2.908L8 15.246l7.582-4.128-1.527-.836L8 13.592l-6.055-3.31z" clipRule="evenodd"/><path fill="var(--icon-accent-purple)" fillRule="evenodd" d="M8 9.427 0 5.064 8 .7l8 4.364zm4.964-4.363L8 7.773l-4.964-2.71L8 2.356z" clipRule="evenodd"/></> }
    }
};

export function Stacks({
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

Stacks.displayName = "Stacks";
