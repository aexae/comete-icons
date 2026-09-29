import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M3.2 14 2 12.8 6.8 8 2 3.2 3.2 2 8 6.8 12.8 2 14 3.2 9.2 8l4.8 4.8-1.2 1.2L8 9.2z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M12 22a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175A9.7 9.7 0 0 1 2 12q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175q1.35-1.35 3.175-2.137A9.7 9.7 0 0 1 12 2q2.075 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.35 1.35 2.137 3.175A9.7 9.7 0 0 1 22 12a9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137A9.7 9.7 0 0 1 12 22m0-8.6L8.4 17 7 15.6l3.6-3.6L7 8.4 8.4 7l3.6 3.6L15.6 7 17 8.4 13.4 12l3.6 3.6-1.4 1.4z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M8 16a7.8 7.8 0 0 1-3.12-.63 8.1 8.1 0 0 1-2.54-1.71 8.1 8.1 0 0 1-1.71-2.54A7.8 7.8 0 0 1 0 8q0-1.66.63-3.12t1.71-2.54A8.1 8.1 0 0 1 4.88.63 7.8 7.8 0 0 1 8 0a7.8 7.8 0 0 1 3.12.63q1.46.63 2.54 1.71t1.71 2.54T16 8a7.8 7.8 0 0 1-.63 3.12 8.1 8.1 0 0 1-1.71 2.54 8.1 8.1 0 0 1-2.54 1.71A7.8 7.8 0 0 1 8 16m0-6.88L5.12 12 4 10.88 6.88 8 4 5.12 5.12 4 8 6.88 10.88 4 12 5.12 9.12 8 12 10.88 10.88 12z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" d="M3.2 14 2 12.8 6.8 8 2 3.2 3.2 2 8 6.8 12.8 2 14 3.2 9.2 8l4.8 4.8-1.2 1.2L8 9.2z"/></> }
    }
};

export function Close({
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

Close.displayName = "Close";
