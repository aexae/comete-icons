import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M7 18h2v-2h2v-2H9v-2H7v2H5v2h2zm6-3.5h6V13h-6zm0 3h4V16h-4zM4 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 20V9q0-.825.587-1.412A1.93 1.93 0 0 1 4 7h5V4q0-.824.588-1.412A1.93 1.93 0 0 1 11 2h2q.825 0 1.412.587Q15 3.176 15 4v3h5q.824 0 1.413.588Q22 8.175 22 9v11q0 .824-.587 1.413A1.93 1.93 0 0 1 20 22zm0-2h16V9h-5q0 .825-.588 1.412A1.93 1.93 0 0 1 13 11h-2q-.825 0-1.412-.588A1.93 1.93 0 0 1 9 9H4zm7-11h2V4h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3169)"><path fill="currentColor" d="M4 13h1.5v-1.75h1.75v-1.5H5.5V8H4v1.75H2.25v1.5H4zm4.75-3h5V9h-5zm0 2.5H12v-1H8.75zM1.5 16q-.62 0-1.06-.44A1.45 1.45 0 0 1 0 14.5v-9q0-.618.44-1.06Q.88 4 1.5 4H6V1.5q0-.62.44-1.06Q6.883 0 7.5 0h1q.619 0 1.06.44.44.442.44 1.06V4h4.5q.619 0 1.06.44.44.442.44 1.06v9q0 .619-.44 1.06-.442.44-1.06.44zm0-1.5h13v-9H10q0 .624-.44 1.063A1.45 1.45 0 0 1 8.5 7h-1q-.619 0-1.06-.44A1.44 1.44 0 0 1 6 5.5H1.5zm6-9h1v-4h-1z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M7 18h2v-2h2v-2H9v-2H7v2H5v2h2zm6-3.5h6V13h-6zm0 3h4V16h-4zM4 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 20V9q0-.825.587-1.412A1.93 1.93 0 0 1 4 7h5V4q0-.824.588-1.412A1.93 1.93 0 0 1 11 2h2q.825 0 1.412.587Q15 3.176 15 4v3h5q.824 0 1.413.588Q22 8.175 22 9v11q0 .824-.587 1.413A1.93 1.93 0 0 1 20 22zm7-13h2V4h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3171)"><path fill="currentColor" d="M4 13h1.5v-1.75h1.75v-1.5H5.5V8H4v1.75H2.25v1.5H4zm4.75-3h5V9h-5zm0 2.5H12v-1H8.75zM1.5 16q-.62 0-1.06-.44A1.45 1.45 0 0 1 0 14.5v-9q0-.618.44-1.06Q.88 4 1.5 4H6V1.5q0-.62.44-1.06Q6.883 0 7.5 0h1q.619 0 1.06.44.44.442.44 1.06V4h4.5q.619 0 1.06.44.44.442.44 1.06v9q0 .619-.44 1.06-.442.44-1.06.44zm6-10.5h1v-4h-1z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M2.588 21.413Q3.175 22 4 22h16q.824 0 1.413-.587Q22 20.825 22 20V9q0-.825-.587-1.412A1.93 1.93 0 0 0 20 7h-5V4q0-.824-.588-1.412A1.93 1.93 0 0 0 13 2h-2q-.825 0-1.412.587A1.93 1.93 0 0 0 9 4v3H4q-.824 0-1.412.588A1.93 1.93 0 0 0 2 9v11q0 .824.587 1.413M20 20H4V9h5q0 .825.588 1.412Q10.175 11 11 11h2q.825 0 1.412-.588Q15 9.826 15 9h5zM13 9h-2V4h2z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M13 14.5h6V13h-6zm0 3h4V16h-4zM7 18h2v-2h2v-2H9v-2H7v2H5v2h2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3173)"><path fill="currentColor" fillRule="evenodd" d="M.44 15.56Q.88 16 1.5 16h13q.619 0 1.06-.44.44-.442.44-1.06v-9q0-.618-.44-1.06A1.45 1.45 0 0 0 14.5 4H10V1.5q0-.62-.44-1.06A1.44 1.44 0 0 0 8.5 0h-1q-.619 0-1.06.44Q6 .883 6 1.5V4H1.5q-.62 0-1.06.44Q0 4.883 0 5.5v9q0 .619.44 1.06M14.5 14.5h-13v-9H6q0 .619.44 1.06Q6.883 7 7.5 7h1a1.45 1.45 0 0 0 1.06-.437Q10 6.125 10 5.5h4.5zm-6-9h-1v-4h1z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M8.75 10h5V9h-5zm0 2.5H12v-1H8.75zM4 13h1.5v-1.75h1.75v-1.5H5.5V8H4v1.75H2.25v1.5H4z"/></g></> }
    }
};

export function MedicalInformation({
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

MedicalInformation.displayName = "MedicalInformation";
