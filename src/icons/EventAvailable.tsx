import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M2.653 22.458a2.14 2.14 0 0 0 1.57.653h15.555a2.14 2.14 0 0 0 1.57-.653 2.14 2.14 0 0 0 .652-1.57V5.334a2.14 2.14 0 0 0-.653-1.57 2.14 2.14 0 0 0-1.57-.652h-1.11V.889h-2.223V3.11H7.556V.889H5.333V3.11h-1.11a2.14 2.14 0 0 0-1.57.653A2.14 2.14 0 0 0 2 5.334v15.555q0 .916.653 1.57m17.125-1.57H4.222V9.779h15.556zm0-13.333H4.222V5.333h15.556z" clipRule="evenodd"/><path fill="currentColor" d="M10.833 19.055 6.89 15.111 8.5 13.5l2.333 2.333 4.667-4.667 1.611 1.612z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M1.27 15.53q.47.47 1.13.47h11.2q.66 0 1.13-.47t.47-1.13V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.8V0H3.2v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 3.2v11.2q0 .66.47 1.13M13.6 14.4H2.4v-8h11.2zm0-9.6H2.4V3.2h11.2z" clipRule="evenodd"/><path fill="currentColor" d="m7.16 13.08-2.84-2.84 1.16-1.16 1.68 1.68 3.36-3.36 1.16 1.16z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M2.653 22.458a2.14 2.14 0 0 0 1.57.653h15.555a2.14 2.14 0 0 0 1.57-.653 2.14 2.14 0 0 0 .652-1.57V5.334a2.14 2.14 0 0 0-.653-1.57 2.14 2.14 0 0 0-1.57-.652h-1.11V.889h-2.223V3.11H7.556V.889H5.333V3.11h-1.11a2.14 2.14 0 0 0-1.57.653A2.14 2.14 0 0 0 2 5.334v15.555q0 .916.653 1.57m17.125-1.57H4.222V9.779h15.556z" clipRule="evenodd"/><path fill="currentColor" d="M10.833 19.055 6.89 15.111 8.5 13.5l2.333 2.333 4.667-4.667 1.611 1.612z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M1.27 15.53q.47.47 1.13.47h11.2q.66 0 1.13-.47t.47-1.13V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.8V0H3.2v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 3.2v11.2q0 .66.47 1.13M13.6 14.4H2.4v-8h11.2z" clipRule="evenodd"/><path fill="currentColor" d="m7.16 13.08-2.84-2.84 1.16-1.16 1.68 1.68 3.36-3.36 1.16 1.16z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M2.653 22.458a2.14 2.14 0 0 0 1.57.653h15.555a2.14 2.14 0 0 0 1.57-.653 2.14 2.14 0 0 0 .652-1.57V5.334a2.14 2.14 0 0 0-.653-1.57 2.14 2.14 0 0 0-1.57-.652h-1.11V.889h-2.223V3.11H7.556V.889H5.333V3.11h-1.11a2.14 2.14 0 0 0-1.57.653A2.14 2.14 0 0 0 2 5.334v15.555q0 .916.653 1.57m17.125-1.57H4.222V9.779h15.556zm0-13.333H4.222V5.333h15.556z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M10.833 19.055 6.89 15.111 8.5 13.5l2.333 2.333 4.667-4.667 1.611 1.612z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M1.27 15.53q.47.47 1.13.47h11.2q.66 0 1.13-.47t.47-1.13V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.8V0H3.2v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 3.2v11.2q0 .66.47 1.13M13.6 14.4H2.4v-8h11.2zm0-9.6H2.4V3.2h11.2z" clipRule="evenodd"/><path fill="var(--icon-success)" d="m7.16 13.08-2.84-2.84 1.16-1.16 1.68 1.68 3.36-3.36 1.16 1.16z"/></> }
    }
};

export function EventAvailable({
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

EventAvailable.displayName = "EventAvailable";
