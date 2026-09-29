import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3.588 20.413Q4.175 21 5 21h14q.824 0 1.413-.587Q21 19.825 21 19v-8h-2v8H5V5h8V3H5q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5v14q0 .824.587 1.413"/><path fill="currentColor" d="M18 17H6l3-4 2.25 3 3-4zM17 7v2h2V7h2V5h-2V3h-2v2h-2v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.522 15.478Q1.044 16 1.778 16h12.444q.734 0 1.256-.522T16 14.222v-7.11h-1.778v7.11H1.778V1.778h7.11V0h-7.11Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778v12.444q0 .734.522 1.256m12.811-3.034H2.667L5.333 8.89l2 2.667L10 8z" clipRule="evenodd"/><path fill="currentColor" d="M12.444 5.333V3.556h-1.777V1.778h1.777V0h1.778v1.778H16v1.778h-1.778v1.777z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h9a4.7 4.7 0 0 0-.75 1.425A5.1 5.1 0 0 0 13 6q0 2.075 1.463 3.537Q15.926 11 18 11a5.1 5.1 0 0 0 1.575-.25A4.7 4.7 0 0 0 21 10v9q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm1-4h12l-3.75-5-3 4L9 13zm11-8V7h-2V5h2V3h2v2h2v2h-2v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M1.778 16q-.734 0-1.256-.522A1.7 1.7 0 0 1 0 14.222V1.778Q0 1.044.522.522A1.7 1.7 0 0 1 1.778 0h8a4.2 4.2 0 0 0-.667 1.267q-.222.689-.222 1.4 0 1.844 1.3 3.144t3.144 1.3q.711 0 1.4-.222.69-.222 1.267-.667v8q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm.889-3.556h10.666L10 8l-2.667 3.556-2-2.667zm9.777-7.11V3.555h-1.777V1.778h1.777V0h1.778v1.778H16v1.778h-1.778v1.777z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.588 20.413Q4.175 21 5 21h14q.824 0 1.413-.587Q21 19.825 21 19v-8h-2v8H5V5h8V3H5q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5v14q0 .824.587 1.413M18 17H6l3-4 2.25 3 3-4z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M17 9V7h-2V5h2V3h2v2h2v2h-2v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.522 15.478Q1.044 16 1.778 16h12.444q.734 0 1.256-.522T16 14.222v-7.11h-1.778v7.11H1.778V1.778h7.11V0h-7.11Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778v12.444q0 .734.522 1.256m12.811-3.034H2.667L5.333 8.89l2 2.667L10 8z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M12.444 5.333V3.556h-1.777V1.778h1.777V0h1.778v1.778H16v1.778h-1.778v1.777z"/></> }
    }
};

export function AddPhoto({
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

AddPhoto.displayName = "AddPhoto";
