import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M14.713 12.713A.97.97 0 0 1 14 13a.97.97 0 0 1-.713-.287A.97.97 0 0 1 13 12q0-.424.287-.713A.97.97 0 0 1 14 11q.424 0 .713.287.287.288.287.713 0 .424-.287.713" clipRule="evenodd"/><path fill="currentColor" d="M3 21v-2h2V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587Q19 4.176 19 5v8.5h-2V5H7v14h6.5v2z"/><path fill="currentColor" d="M15 19.865 16.135 21 18 19.135 19.865 21 21 19.865 19.135 18 21 16.135 19.865 15 18 16.865 16.135 15 15 16.135 16.865 18z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M10.411 8.633a.86.86 0 0 1-.633.256.86.86 0 0 1-.634-.256A.86.86 0 0 1 8.89 8a.86.86 0 0 1 .255-.633.86.86 0 0 1 .634-.256.86.86 0 0 1 .633.256.86.86 0 0 1 .256.633.86.86 0 0 1-.256.633" clipRule="evenodd"/><path fill="currentColor" d="M0 16v-1.778h1.778V1.778q0-.734.522-1.256A1.7 1.7 0 0 1 3.556 0h8.888q.734 0 1.256.522t.522 1.256v7.555h-1.778V1.778H3.556v12.444h5.777V16z"/><path fill="currentColor" d="M10.667 14.991 11.676 16l1.657-1.658L14.991 16 16 14.991l-1.658-1.658L16 11.676l-1.009-1.01-1.658 1.658-1.657-1.657-1.01 1.009 1.658 1.657z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M15 19.865 16.135 21 18 19.135 19.865 21 21 19.865 19.135 18 21 16.135 19.865 15 18 16.865 16.135 15 15 16.135 16.865 18z"/><path fill="currentColor" fillRule="evenodd" d="M3 21v-2h2V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587Q19 4.176 19 5v8.5h-5.5V21zm11.713-8.287A.97.97 0 0 1 14 13a.97.97 0 0 1-.713-.287A.97.97 0 0 1 13 12q0-.424.287-.713A.97.97 0 0 1 14 11q.424 0 .713.287.287.288.287.713 0 .424-.287.713" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M10.667 14.991 11.676 16l1.657-1.658L14.991 16 16 14.991l-1.658-1.658L16 11.676l-1.009-1.01-1.658 1.658-1.657-1.657-1.01 1.009 1.658 1.657z"/><path fill="currentColor" fillRule="evenodd" d="M0 16v-1.778h1.778V1.778q0-.734.522-1.256A1.7 1.7 0 0 1 3.556 0h8.888q.734 0 1.256.522t.522 1.256v7.555H9.333V16zm10.411-7.367a.86.86 0 0 1-.633.256.86.86 0 0 1-.634-.256A.86.86 0 0 1 8.89 8a.86.86 0 0 1 .255-.633.86.86 0 0 1 .634-.256.86.86 0 0 1 .633.256.86.86 0 0 1 .256.633.86.86 0 0 1-.256.633" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M14.713 12.713A.97.97 0 0 1 14 13a.97.97 0 0 1-.713-.287A.97.97 0 0 1 13 12q0-.424.287-.713A.97.97 0 0 1 14 11q.424 0 .713.287.287.288.287.713 0 .424-.287.713" clipRule="evenodd"/><path fill="currentColor" d="M3 21v-2h2V5q0-.824.588-1.412A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587Q19 4.176 19 5v8.5h-2V5H7v14h6.5v2z"/><path fill="var(--icon-critical)" d="M15 19.865 16.135 21 18 19.135 19.865 21 21 19.865 19.135 18 21 16.135 19.865 15 18 16.865 16.135 15 15 16.135 16.865 18z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M10.411 8.633a.86.86 0 0 1-.633.256.86.86 0 0 1-.634-.256A.86.86 0 0 1 8.89 8a.86.86 0 0 1 .255-.633.86.86 0 0 1 .634-.256.86.86 0 0 1 .633.256.86.86 0 0 1 .256.633.86.86 0 0 1-.256.633" clipRule="evenodd"/><path fill="currentColor" d="M0 16v-1.778h1.778V1.778q0-.734.522-1.256A1.7 1.7 0 0 1 3.556 0h8.888q.734 0 1.256.522t.522 1.256v7.555h-1.778V1.778H3.556v12.444h5.777V16z"/><path fill="var(--icon-critical)" d="M10.667 14.991 11.676 16l1.657-1.658L14.991 16 16 14.991l-1.658-1.658L16 11.676l-1.009-1.01-1.658 1.658-1.657-1.657-1.01 1.009 1.658 1.657z"/></> }
    }
};

export function ContractEnded({
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

ContractEnded.displayName = "ContractEnded";
