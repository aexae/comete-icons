import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M9 16.5q-1.05 0-1.775-.725T6.5 14t.725-1.775T9 11.5t1.775.725T11.5 14t-.725 1.775T9 16.5M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M6 11q-.7 0-1.183-.483t-.484-1.183.484-1.184T6 7.667t1.183.483.484 1.184-.484 1.183T6 11m-2.667 3.667q-.55 0-.941-.392T2 13.334V4q0-.55.392-.942t.941-.391H4V1.333h1.333v1.334h5.334V1.333H12v1.334h.667q.55 0 .942.391T14 4v9.334q0 .55-.391.941t-.942.392zm0-1.333h9.334V6.667H3.333zm0-8h9.334V4H3.333zm0 0V4z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M9 16.5q-1.05 0-1.775-.725T6.5 14t.725-1.775T9 11.5t1.775.725T11.5 14t-.725 1.775T9 16.5M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M6 11q-.7 0-1.183-.483t-.484-1.183.484-1.184T6 7.667t1.183.483.484 1.184-.484 1.183T6 11m-2.667 3.667q-.55 0-.941-.392T2 13.334V4q0-.55.392-.942t.941-.391H4V1.333h1.333v1.334h5.334V1.333H12v1.334h.667q.55 0 .942.391T14 4v9.334q0 .55-.391.941t-.942.392zm0-1.333h9.334V6.667H3.333z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M9 16.5q-1.05 0-1.775-.725T6.5 14t.725-1.775T9 11.5t1.775.725T11.5 14t-.725 1.775T9 16.5M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M6 11q-.7 0-1.183-.483t-.484-1.183.484-1.184T6 7.667t1.183.483.484 1.184-.484 1.183T6 11m-2.667 3.667q-.55 0-.941-.392T2 13.334V4q0-.55.392-.942t.941-.391H4V1.333h1.333v1.334h5.334V1.333H12v1.334h.667q.55 0 .942.391T14 4v9.334q0 .55-.391.941t-.942.392zm0-1.333h9.334V6.667H3.333zm0-8h9.334V4H3.333zm0 0V4z"/></> }
    }
};

export function Today({
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

Today.displayName = "Today";
