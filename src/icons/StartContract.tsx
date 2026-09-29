import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3 21v-2h2V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587Q19 4.176 19 5v8.5h-2V5H7v14h6.5v2zm11-8q.424 0 .713-.287A.97.97 0 0 0 15 12a.97.97 0 0 0-.287-.713A.97.97 0 0 0 14 11a.97.97 0 0 0-.713.287A.97.97 0 0 0 13 12q0 .424.287.713.288.287.713.287" clipRule="evenodd"/><path fill="currentColor" d="m18.91 20.59 1.258-1.236-2.606-2.606h1.965v-1.767h-4.99v4.992h1.766v-1.988z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.37 16v-1.778h1.778V1.778q0-.734.522-1.256A1.7 1.7 0 0 1 3.925 0h8.89q.732 0 1.255.522t.522 1.256v7.555h-1.778V1.778H3.925v12.444h5.778V16zm9.778-7.111a.86.86 0 0 0 .633-.256.86.86 0 0 0 .255-.633.86.86 0 0 0-.255-.633.86.86 0 0 0-.633-.256.86.86 0 0 0-.634.256A.86.86 0 0 0 9.26 8a.86.86 0 0 0 .255.633.86.86 0 0 0 .634.256" clipRule="evenodd"/><path fill="currentColor" d="m14.511 15.636 1.12-1.099-2.317-2.317h1.747v-1.57h-4.437v4.437h1.571V13.32z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m18.91 20.59 1.258-1.236-2.606-2.606h1.965v-1.767h-4.99v4.992h1.766v-1.988z"/><path fill="currentColor" fillRule="evenodd" d="M3 21v-2h2V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587Q19 4.176 19 5v8.5h-5.5V21zm11.713-8.287A.97.97 0 0 1 14 13a.97.97 0 0 1-.713-.287A.97.97 0 0 1 13 12q0-.424.287-.713A.97.97 0 0 1 14 11q.424 0 .713.287.287.288.287.713 0 .424-.287.713" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m14.511 15.636 1.12-1.099-2.317-2.317h1.747v-1.57h-4.437v4.437h1.571V13.32z"/><path fill="currentColor" fillRule="evenodd" d="M.37 16v-1.778h1.778V1.778q0-.734.522-1.256A1.7 1.7 0 0 1 3.925 0h8.89q.732 0 1.255.522t.522 1.256v7.555H9.703V16zm10.41-7.367a.86.86 0 0 1-.633.256.86.86 0 0 1-.634-.256A.86.86 0 0 1 9.26 8a.86.86 0 0 1 .255-.633.86.86 0 0 1 .634-.256.86.86 0 0 1 .633.256.86.86 0 0 1 .255.633.86.86 0 0 1-.255.633" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3 21v-2h2V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587Q19 4.176 19 5v8.5h-2V5H7v14h6.5v2zm11-8q.424 0 .713-.287A.97.97 0 0 0 15 12a.97.97 0 0 0-.287-.713A.97.97 0 0 0 14 11a.97.97 0 0 0-.713.287A.97.97 0 0 0 13 12q0 .424.287.713.288.287.713.287" clipRule="evenodd"/><path fill="var(--icon-success)" d="m18.91 20.59 1.258-1.236-2.606-2.606h1.965v-1.767h-4.99v4.992h1.766v-1.988z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.37 16v-1.778h1.777V1.778q0-.734.523-1.256A1.7 1.7 0 0 1 3.925 0h8.89q.733 0 1.255.522t.522 1.256v7.555h-1.778V1.778H3.925v12.444h5.778V16zm9.777-7.111a.86.86 0 0 0 .634-.256.86.86 0 0 0 .255-.633.86.86 0 0 0-.255-.633.86.86 0 0 0-.634-.256.86.86 0 0 0-.633.256A.86.86 0 0 0 9.26 8a.86.86 0 0 0 .255.633.86.86 0 0 0 .633.256" clipRule="evenodd"/><path fill="var(--icon-success)" d="m14.511 15.636 1.12-1.099-2.318-2.317h1.748v-1.57h-4.437v4.437h1.571V13.32z"/></> }
    }
};

export function StartContract({
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

StartContract.displayName = "StartContract";
