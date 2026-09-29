import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3zm-9 8V4q0-.824.587-1.412A1.93 1.93 0 0 1 4 2h16q.824 0 1.413.587Q22 3.176 22 4v12q0 .824-.587 1.413A1.93 1.93 0 0 1 20 18H6zm3.15-6H20V4H4v13.125z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.2 9.6h1.6V7.2h2.4V5.6H8.8V3.2H7.2v2.4H4.8v1.6h2.4zM0 16V1.6Q0 .94.47.47A1.54 1.54 0 0 1 1.6 0h12.8q.66 0 1.13.47T16 1.6v9.6q0 .66-.47 1.13a1.54 1.54 0 0 1-1.13.47H3.2zm2.52-4.8H14.4V1.6H1.6v10.5z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.15 16H20V4H4v13.125zM13 14h-2v-3H8V9h3V6h2v3h3v2h-3z" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M2 4v18l4-4h14q.824 0 1.413-.587Q22 16.825 22 16V4q0-.824-.587-1.412A1.93 1.93 0 0 0 20 2H4q-.824 0-1.412.587A1.93 1.93 0 0 0 2 4m18 12H5.15L4 17.125V4h16z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M2.52 11.2H14.4V1.6H1.6v10.5zM8.8 9.6H7.2V7.2H4.8V5.6h2.4V3.2h1.6v2.4h2.4v1.6H8.8z" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M0 1.6V16l3.2-3.2h11.2q.66 0 1.13-.47T16 11.2V1.6q0-.66-.47-1.13A1.54 1.54 0 0 0 14.4 0H1.6Q.94 0 .47.47A1.54 1.54 0 0 0 0 1.6m14.4 9.6H2.52l-.92.9V1.6h12.8z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M2 4v18l4-4h14q.824 0 1.413-.587Q22 16.825 22 16V4q0-.824-.587-1.412A1.93 1.93 0 0 0 20 2H4q-.824 0-1.412.587A1.93 1.93 0 0 0 2 4m18 12H5.15L4 17.125V4h16z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M0 1.6V16l3.2-3.2h11.2q.66 0 1.13-.47T16 11.2V1.6q0-.66-.47-1.13A1.54 1.54 0 0 0 14.4 0H1.6Q.94 0 .47.47A1.54 1.54 0 0 0 0 1.6m14.4 9.6H2.52l-.92.9V1.6h12.8z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M7.2 9.6h1.6V7.2h2.4V5.6H8.8V3.2H7.2v2.4H4.8v1.6h2.4z"/></> }
    }
};

export function AddComments({
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

AddComments.displayName = "AddComments";
