import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M10.875 21v-9.169L7.95 14.756l-1.575-1.631L12 7.5l5.625 5.625-1.575 1.631-2.925-2.925V21zM3 8.625V5.25q0-.928.66-1.59Q4.323 3 5.25 3h13.5q.928 0 1.59.66.66.662.66 1.59v3.375h-2.25V5.25H5.25v3.375z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_795_3544)"><path fill="currentColor" d="M7 16V7.85l-2.6 2.6L3 9l5-5 5 5-1.4 1.45L9 7.85V16zM0 5V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h12q.825 0 1.412.588Q16 1.175 16 2v3h-2V2H2v3z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M10.875 21v-9.169L7.95 14.756l-1.575-1.631L12 7.5l5.625 5.625-1.575 1.631-2.925-2.925V21zM3 8.625V5.25q0-.928.66-1.59Q4.323 3 5.25 3h13.5q.928 0 1.59.66.66.662.66 1.59v3.375h-2.25V5.25H5.25v3.375z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_795_3546)"><path fill="currentColor" d="M7 16V7.85l-2.6 2.6L3 9l5-5 5 5-1.4 1.45L9 7.85V16zM0 5V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h12q.825 0 1.412.588Q16 1.175 16 2v3h-2V2H2v3z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3 5.25v3.375h2.25V5.25h13.5v3.375H21V5.25q0-.928-.66-1.59Q19.677 3 18.75 3H5.25q-.928 0-1.59.66Q3 4.323 3 5.25" clipRule="evenodd"/><path fill="var(--icon-information)" d="M10.875 21v-9.169L7.95 14.756l-1.575-1.631L12 7.5l5.625 5.625-1.575 1.631-2.925-2.925V21z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_795_3548)"><path fill="currentColor" fillRule="evenodd" d="M0 2v3h2V2h12v3h2V2q0-.824-.588-1.412A1.93 1.93 0 0 0 14 0H2Q1.176 0 .588.588A1.93 1.93 0 0 0 0 2" clipRule="evenodd"/><path fill="var(--icon-information)" d="M7 16V7.85l-2.6 2.6L3 9l5-5 5 5-1.4 1.45L9 7.85V16z"/></g></> }
    }
};

export function Publish({
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

Publish.displayName = "Publish";
