import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3 8.625V5.25q0-.928.66-1.59Q4.323 3 5.25 3h13.5q.928 0 1.59.66.66.662.66 1.59v3.375h-2.25V5.25H5.25v3.375z"/><path fill="currentColor" d="M13.125 7.5v9.169l2.925-2.925 1.575 1.631L12 21l-5.625-5.625 1.575-1.631 2.925 2.925V7.5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g fill="currentColor" clip-path="url(#clip0_795_3618)"><path d="M0 5V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h12q.825 0 1.412.588Q16 1.175 16 2v3h-2V2H2v3z"/><path d="M9 4v8.15l2.6-2.6L13 11l-5 5-5-5 1.4-1.45 2.6 2.6V4z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3 8.625V5.25q0-.928.66-1.59Q4.323 3 5.25 3h13.5q.928 0 1.59.66.66.662.66 1.59v3.375h-2.25V5.25H5.25v3.375z"/><path fill="currentColor" d="M13.125 7.5v9.169l2.925-2.925 1.575 1.631L12 21l-5.625-5.625 1.575-1.631 2.925 2.925V7.5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g fill="currentColor" clip-path="url(#clip0_795_3620)"><path d="M0 5V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h12q.825 0 1.412.588Q16 1.175 16 2v3h-2V2H2v3z"/><path d="M9 4v8.15l2.6-2.6L13 11l-5 5-5-5 1.4-1.45 2.6 2.6V4z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3 5.25v3.375h2.25V5.25h13.5v3.375H21V5.25q0-.928-.66-1.59Q19.677 3 18.75 3H5.25q-.928 0-1.59.66Q3 4.323 3 5.25" clipRule="evenodd"/><path fill="var(--icon-information)" d="M13.125 7.5v9.169l2.925-2.925 1.575 1.631L12 21l-5.625-5.625 1.575-1.631 2.925 2.925V7.5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_795_3622)"><path fill="currentColor" d="M0 5V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h12q.825 0 1.412.588Q16 1.175 16 2v3h-2V2H2v3z"/><path fill="var(--icon-information)" d="M9 4v8.15l2.6-2.6L13 11l-5 5-5-5 1.4-1.45 2.6 2.6V4z"/></g></> }
    }
};

export function Unpublish({
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

Unpublish.displayName = "Unpublish";
