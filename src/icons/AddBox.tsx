import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4z"/><path fill="currentColor" fillRule="evenodd" d="M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm14-2H5V5h14z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.522 15.478Q1.044 16 1.778 16h12.444q.734 0 1.256-.522T16 14.222V1.778q0-.734-.522-1.256A1.7 1.7 0 0 0 14.222 0H1.778Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778v12.444q0 .734.522 1.256m13.7-1.256H1.778V1.778h12.444z" clipRule="evenodd"/><path fill="currentColor" d="M7.111 12.444H8.89V8.89h3.555V7.11H8.89V3.556H7.11V7.11H3.556v1.78H7.11z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm8-4h-2v-4H7v-2h4V7h2v4h4v2h-4z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M1.778 16q-.734 0-1.256-.522A1.7 1.7 0 0 1 0 14.222V1.778Q0 1.044.522.522A1.7 1.7 0 0 1 1.778 0h12.444q.734 0 1.256.522T16 1.778v12.444q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm7.11-3.556H7.112V8.89H3.556V7.11H7.11V3.556h1.78V7.11h3.555v1.78H8.89z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.588 20.413Q4.175 21 5 21h14q.824 0 1.413-.587Q21 19.825 21 19V5q0-.824-.587-1.412A1.93 1.93 0 0 0 19 3H5q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5v14q0 .824.587 1.413M19 19H5V5h14z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.522 15.478Q1.044 16 1.778 16h12.444q.734 0 1.256-.522T16 14.222V1.778q0-.734-.522-1.256A1.7 1.7 0 0 0 14.222 0H1.778Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778v12.444q0 .734.522 1.256m13.7-1.256H1.778V1.778h12.444z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M7.111 12.444H8.89V8.89h3.555V7.11H8.89V3.556H7.11V7.11H3.556v1.78H7.11z"/></> }
    }
};

export function AddBox({
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

AddBox.displayName = "AddBox";
