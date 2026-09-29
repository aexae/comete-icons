import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M8.667 2.85a2.483 2.483 0 0 0 0 4.967h2.483V2.85zM12 1.15h3.333a4.183 4.183 0 0 1 2.528 7.517 4.183 4.183 0 0 1-5.011 6.7v3.3a4.183 4.183 0 1 1-6.711-3.334A4.18 4.18 0 0 1 4.483 12c0-1.36.65-2.57 1.656-3.333A4.183 4.183 0 0 1 8.667 1.15zM8.667 9.517a2.483 2.483 0 0 0 0 4.966h2.483V9.517zm4.183-1.7h2.483a2.483 2.483 0 1 0 0-4.967H12.85zm2.483 1.7a2.483 2.483 0 1 0 0 4.966 2.483 2.483 0 0 0 0-4.966m-4.183 6.666H8.667a2.483 2.483 0 1 0 2.483 2.484z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.542 1.254a1.831 1.831 0 1 0 0 3.662h1.831V1.253zM8 0h2.458a3.084 3.084 0 0 1 1.864 5.542 3.084 3.084 0 0 1-3.695 4.94v2.434a3.085 3.085 0 1 1-4.949-2.458A3.08 3.08 0 0 1 2.458 8a3.08 3.08 0 0 1 1.22-2.458A3.084 3.084 0 0 1 5.542 0zM5.542 6.169a1.831 1.831 0 1 0 0 3.662h1.831V6.17zm3.085-1.253h1.83a1.831 1.831 0 1 0 0-3.662h-1.83zm1.83 1.253a1.831 1.831 0 1 0 0 3.662 1.831 1.831 0 0 0 0-3.662m-3.084 4.916h-1.83a1.831 1.831 0 1 0 1.83 1.83z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M8.667 2.85a2.483 2.483 0 0 0 0 4.967h2.483V2.85zM12 1.15h3.333a4.183 4.183 0 0 1 2.528 7.517 4.183 4.183 0 0 1-5.011 6.7v3.3a4.183 4.183 0 1 1-6.711-3.334A4.18 4.18 0 0 1 4.483 12c0-1.36.65-2.57 1.656-3.333A4.183 4.183 0 0 1 8.667 1.15zM8.667 9.517a2.483 2.483 0 0 0 0 4.966h2.483V9.517zm4.183-1.7h2.483a2.483 2.483 0 1 0 0-4.967H12.85zm2.483 1.7a2.483 2.483 0 1 0 0 4.966 2.483 2.483 0 0 0 0-4.966m-4.183 6.666H8.667a2.483 2.483 0 1 0 2.483 2.484z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.542 1.254a1.831 1.831 0 1 0 0 3.662h1.831V1.253zM8 0h2.458a3.084 3.084 0 0 1 1.864 5.542 3.084 3.084 0 0 1-3.695 4.94v2.434a3.085 3.085 0 1 1-4.949-2.458A3.08 3.08 0 0 1 2.458 8a3.08 3.08 0 0 1 1.22-2.458A3.084 3.084 0 0 1 5.542 0zM5.542 6.169a1.831 1.831 0 1 0 0 3.662h1.831V6.17zm3.085-1.253h1.83a1.831 1.831 0 1 0 0-3.662h-1.83zm1.83 1.253a1.831 1.831 0 1 0 0 3.662 1.831 1.831 0 0 0 0-3.662m-3.084 4.916h-1.83a1.831 1.831 0 1 0 1.83 1.83z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-accent-purple)" fillRule="evenodd" d="M8.667 2.85a2.483 2.483 0 0 0 0 4.967h2.483V2.85zM12 1.15h3.333a4.183 4.183 0 0 1 2.528 7.517 4.183 4.183 0 0 1-5.011 6.7v3.3a4.183 4.183 0 1 1-6.711-3.334A4.18 4.18 0 0 1 4.483 12c0-1.36.65-2.57 1.656-3.333A4.183 4.183 0 0 1 8.667 1.15zM8.667 9.517a2.483 2.483 0 0 0 0 4.966h2.483V9.517zm4.183-1.7h2.483a2.483 2.483 0 1 0 0-4.967H12.85zm2.483 1.7a2.483 2.483 0 1 0 0 4.966 2.483 2.483 0 0 0 0-4.966m-4.183 6.666H8.667a2.483 2.483 0 1 0 2.483 2.484z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-accent-purple)" fillRule="evenodd" d="M5.542 1.254a1.831 1.831 0 1 0 0 3.662h1.831V1.253zM8 0h2.458a3.084 3.084 0 0 1 1.864 5.542 3.084 3.084 0 0 1-3.695 4.94v2.434a3.085 3.085 0 1 1-4.949-2.458A3.08 3.08 0 0 1 2.458 8a3.08 3.08 0 0 1 1.22-2.458A3.084 3.084 0 0 1 5.542 0zM5.542 6.169a1.831 1.831 0 1 0 0 3.662h1.831V6.17zm3.085-1.253h1.83a1.831 1.831 0 1 0 0-3.662h-1.83zm1.83 1.253a1.831 1.831 0 1 0 0 3.662 1.831 1.831 0 0 0 0-3.662m-3.084 4.916h-1.83a1.831 1.831 0 1 0 1.83 1.83z" clipRule="evenodd"/></> }
    }
};

export function Figma({
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

Figma.displayName = "Figma";
