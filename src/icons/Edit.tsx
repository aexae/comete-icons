import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M20.36 5.966 18.037 3.64A2.2 2.2 0 0 0 16.485 3c-.56 0-1.122.214-1.55.64L4.245 14.332l5.423 5.423 10.69-10.69a2.19 2.19 0 0 0 0-3.098zM7.187 14.492l2.322 2.323 9.3-9.3-2.324-2.324h-.002z" clipRule="evenodd"/><path fill="currentColor" d="M3.022 19.685a1.095 1.095 0 0 0 1.293 1.293l4.174-.855-4.612-4.612z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.02 14.831a.974.974 0 0 0 1.149 1.15l3.71-.76-4.1-4.1zm5.766-2.551-2.064-2.065 8.263-8.267h.002l2.066 2.065zm9.645-9.644L13.366.57A1.94 1.94 0 0 0 11.987 0c-.499 0-.997.19-1.378.57l-9.502 9.502 4.82 4.82L15.43 5.39a1.947 1.947 0 0 0 0-2.754" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3.022 19.685a1.095 1.095 0 0 0 1.293 1.293l4.174-.855-4.612-4.612z"/><path fill="currentColor" fillRule="evenodd" d="M20.36 5.966 18.037 3.64A2.2 2.2 0 0 0 16.485 3c-.56 0-1.122.214-1.55.64L4.245 14.332l5.423 5.423 10.69-10.69a2.19 2.19 0 0 0 0-3.098zM7.187 14.492l2.322 2.323L17.024 9.3 14.7 6.976z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.02 14.831a.974.974 0 0 0 1.149 1.15l3.71-.76-4.1-4.1zm5.766-2.551-2.064-2.065 6.678-6.68L12.466 5.6zm9.645-9.644L13.366.57A1.94 1.94 0 0 0 11.987 0c-.499 0-.997.19-1.378.57l-9.502 9.502 4.82 4.82L15.43 5.39a1.947 1.947 0 0 0 0-2.754" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.022 19.685a1.095 1.095 0 0 0 1.293 1.293l4.174-.855-4.612-4.612zm6.487-2.87-2.322-2.323 9.296-9.3h.002l2.324 2.323zm10.85-10.85-2.322-2.324A2.2 2.2 0 0 0 16.485 3c-.56 0-1.122.214-1.55.64L4.245 14.332l5.423 5.423 10.69-10.69a2.19 2.19 0 0 0 0-3.098z" clipRule="evenodd"/><path fill="var(--background-cycle-day-bold-default)" d="m9.51 16.815-2.323-2.323 9.296-9.3h.002l2.324 2.323z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.02 14.831a.974.974 0 0 0 1.149 1.15l3.71-.76-4.1-4.1zm5.766-2.551-2.064-2.065 8.263-8.267h.002l2.066 2.065zm9.645-9.644L13.366.57A1.94 1.94 0 0 0 11.987 0c-.499 0-.997.19-1.378.57l-9.502 9.502 4.82 4.82L15.43 5.39a1.947 1.947 0 0 0 0-2.754" clipRule="evenodd"/><path fill="var(--background-cycle-day-bold-default)" d="m5.786 12.28-2.064-2.065 8.263-8.267h.002l2.066 2.065z"/></> }
    }
};

export function Edit({
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

Edit.displayName = "Edit";
