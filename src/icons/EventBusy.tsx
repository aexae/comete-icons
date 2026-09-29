import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m7.889 17.889 1.555 1.555L12 16.89l2.555 2.555 1.556-1.555-2.556-2.556 2.556-2.555-1.556-1.556L12 13.778l-2.556-2.556-1.555 1.556 2.555 2.555z"/><path fill="currentColor" fillRule="evenodd" d="M2.653 22.458a2.14 2.14 0 0 0 1.57.653h15.555a2.14 2.14 0 0 0 1.57-.653 2.14 2.14 0 0 0 .652-1.57V5.334a2.14 2.14 0 0 0-.653-1.57 2.14 2.14 0 0 0-1.57-.652h-1.11V.889h-2.223V3.11H7.556V.889H5.333V3.11h-1.11a2.14 2.14 0 0 0-1.57.653A2.14 2.14 0 0 0 2 5.334v15.555q0 .916.653 1.57m17.125-1.57H4.222V9.779h15.556zm-.224-13.333H4.281V5.333h15.273z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m5.018 12.24 1.141 1.12 1.874-1.84 1.874 1.84 1.14-1.12-1.873-1.84 1.874-1.84-1.14-1.12-1.875 1.84L6.16 7.44 5.02 8.56l1.873 1.84z"/><path fill="currentColor" fillRule="evenodd" d="M1.179 15.53q.478.47 1.15.47h11.408q.672 0 1.15-.47.48-.47.48-1.13V3.2q0-.66-.48-1.13a1.58 1.58 0 0 0-1.15-.47h-.815V0h-1.63v1.6H4.775V0h-1.63v1.6H2.33q-.673 0-1.151.47Q.699 2.54.7 3.2v11.2q0 .66.479 1.13m12.558-1.13H2.33v-8h11.407zm-.164-9.6h-11.2V3.2h11.2z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M4.222 23.11a2.14 2.14 0 0 1-1.57-.652A2.14 2.14 0 0 1 2 20.888V5.334q0-.916.653-1.57a2.14 2.14 0 0 1 1.57-.652h1.11V.889h2.223V3.11h8.888V.889h2.223V3.11h1.11a2.14 2.14 0 0 1 1.57.653q.653.652.653 1.57v15.555a2.14 2.14 0 0 1-.653 1.57 2.14 2.14 0 0 1-1.57.652zm0-2.221h15.556V9.778H4.222z"/><path fill="currentColor" d="m7.889 17.889 1.555 1.555L12 16.89l2.555 2.555 1.556-1.555-2.556-2.556 2.556-2.555-1.556-1.556L12 13.778l-2.556-2.556-1.555 1.556 2.555 2.555z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2.33 16q-.672 0-1.151-.47A1.53 1.53 0 0 1 .7 14.4V3.2q0-.66.479-1.13t1.15-.47h.816V0h1.63v1.6h6.518V0h1.63v1.6h.814q.672 0 1.151.47.48.47.479 1.13v11.2q0 .66-.479 1.13t-1.15.47zm0-1.6h11.407v-8H2.33z"/><path fill="currentColor" d="m5.019 12.24 1.14 1.12 1.874-1.84 1.874 1.84 1.141-1.12-1.874-1.84 1.874-1.84-1.14-1.12-1.875 1.84L6.16 7.44 5.02 8.56l1.874 1.84z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="m7.889 17.889 1.555 1.555L12 16.89l2.555 2.555 1.556-1.555-2.556-2.556 2.556-2.555-1.556-1.556L12 13.778l-2.556-2.556-1.555 1.556 2.555 2.555z"/><path fill="currentColor" fillRule="evenodd" d="M2.653 22.458a2.14 2.14 0 0 0 1.57.653h15.555a2.14 2.14 0 0 0 1.57-.653 2.14 2.14 0 0 0 .652-1.57V5.334a2.14 2.14 0 0 0-.653-1.57 2.14 2.14 0 0 0-1.57-.652h-1.11V.889h-2.223V3.11H7.556V.889H5.333V3.11h-1.11a2.14 2.14 0 0 0-1.57.653A2.14 2.14 0 0 0 2 5.334v15.555q0 .916.653 1.57m17.125-1.57H4.222V9.779h15.556zm-.224-13.333H4.281V5.333h15.273z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2.33 16q-.672 0-1.151-.47A1.53 1.53 0 0 1 .7 14.4V3.2q0-.66.479-1.13t1.15-.47h.816V0h1.63v1.6h6.518V0h1.63v1.6h.814q.672 0 1.151.47.48.47.479 1.13v11.2q0 .66-.479 1.13t-1.15.47zm0-1.6h11.407v-8H2.33z"/><path fill="var(--icon-critical)" d="m5.019 12.24 1.14 1.12 1.874-1.84 1.874 1.84 1.141-1.12-1.874-1.84 1.874-1.84-1.14-1.12-1.875 1.84L6.16 7.44 5.02 8.56l1.874 1.84z"/></> }
    }
};

export function EventBusy({
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

EventBusy.displayName = "EventBusy";
