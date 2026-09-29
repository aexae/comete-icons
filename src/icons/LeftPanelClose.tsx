import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M16.5 16V8l-4 4zM5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm3-2V5H5v14zm2 0h9V5h-9z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_1608_1643)"><path fill="currentColor" d="M12 11.556V4.444L8.444 8zM1.778 16q-.734 0-1.256-.522A1.7 1.7 0 0 1 0 14.222V1.778Q0 1.044.522.522A1.7 1.7 0 0 1 1.778 0h12.444q.734 0 1.256.522T16 1.778v12.444q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm2.666-1.778V1.778H1.778v12.444zm1.778 0h8V1.778h-8z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M16.5 16V8l-4 4zM5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm5-2h9V5h-9z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_1608_1645)"><path fill="currentColor" d="M12 11.556V4.444L8.444 8zM1.778 16q-.734 0-1.256-.522A1.7 1.7 0 0 1 0 14.222V1.778Q0 1.044.522.522A1.7 1.7 0 0 1 1.778 0h12.444q.734 0 1.256.522T16 1.778v12.444q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm4.444-1.778h8V1.778h-8z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.588 20.413Q4.175 21 5 21h14q.824 0 1.413-.587Q21 19.825 21 19V5q0-.824-.587-1.412A1.93 1.93 0 0 0 19 3H5q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5v14q0 .824.587 1.413M8 5v14H5V5zm11 14h-9V5h9z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M16.5 16V8l-4 4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_1608_1647)"><path fill="currentColor" fillRule="evenodd" d="M.522 15.478Q1.044 16 1.778 16h12.444q.734 0 1.256-.522T16 14.222V1.778q0-.734-.522-1.256A1.7 1.7 0 0 0 14.222 0H1.778Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778v12.444q0 .734.522 1.256m3.922-13.7v12.444H1.778V1.778zm9.778 12.444h-8V1.778h8z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M12 11.556V4.444L8.444 8z"/></g></> }
    }
};

export function LeftPanelClose({
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

LeftPanelClose.displayName = "LeftPanelClose";
