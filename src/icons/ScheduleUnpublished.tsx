import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m12.95 18.508-1.997-.018v-4.172L9.362 15.91l-1.414-1.414 3.995-3.995 3.995 3.995-1.414 1.414-1.573-1.573z"/><path fill="currentColor" fillRule="evenodd" d="M3.54 21.413Q4.127 22 4.952 22h14q.825 0 1.413-.587.587-.588.587-1.413V6q0-.824-.587-1.412A1.93 1.93 0 0 0 18.952 4h-1V2h-2v2h-8V2h-2v2h-1q-.824 0-1.412.588A1.93 1.93 0 0 0 2.952 6v14q0 .824.588 1.413M18.952 20h-14V10h14zm0-12h-14V6h14z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8.799 13.206 7.2 13.192V9.855l-1.272 1.272-1.132-1.131L7.992 6.8l3.196 3.196-1.13 1.131-1.26-1.258z"/><path fill="currentColor" fillRule="evenodd" d="M1.27 15.53q.47.47 1.13.47h11.2q.66 0 1.13-.47t.47-1.13V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.8V0H3.2v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 3.2v11.2q0 .66.47 1.13M13.6 14.4H2.4v-8h11.2zm0-9.6H2.4V3.2h11.192z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M4.952 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 2.952 20V6q0-.824.588-1.412A1.93 1.93 0 0 1 4.952 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588.587.587.587 1.412v14q0 .824-.587 1.413a1.93 1.93 0 0 1-1.413.587zm0-2h14V10h-14z"/><path fill="currentColor" d="m12.95 18.508-1.997-.018v-4.172L9.362 15.91l-1.414-1.414 3.995-3.995 3.995 3.995-1.414 1.414-1.573-1.573z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8.798 13.206 7.2 13.192V9.855l-1.273 1.272-1.131-1.131L7.992 6.8l3.196 3.196-1.131 1.131L8.798 9.87z"/><path fill="currentColor" fillRule="evenodd" d="M1.27 15.53q.47.47 1.13.47h11.2q.66 0 1.13-.47t.47-1.13V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.8V0H3.2v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 3.2v11.2q0 .66.47 1.13M13.6 14.4H2.4v-8h11.2z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="m12.95 18.508-1.997-.018v-4.172L9.362 15.91l-1.414-1.414 3.995-3.995 3.995 3.995-1.414 1.414-1.573-1.573z"/><path fill="currentColor" fillRule="evenodd" d="M3.54 21.413Q4.127 22 4.952 22h14q.825 0 1.413-.587.587-.588.587-1.413V6q0-.824-.587-1.412A1.93 1.93 0 0 0 18.952 4h-1V2h-2v2h-8V2h-2v2h-1q-.824 0-1.412.588A1.93 1.93 0 0 0 2.952 6v14q0 .824.588 1.413M18.952 20h-14V10h14zm0-12h-14V6h14z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" d="M8.798 13.206 7.2 13.192V9.855l-1.273 1.272-1.131-1.131L7.992 6.8l3.196 3.196-1.131 1.131L8.798 9.87z"/><path fill="currentColor" fillRule="evenodd" d="M1.27 15.53q.47.47 1.13.47h11.2q.66 0 1.13-.47t.47-1.13V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.8V0H3.2v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 3.2v11.2q0 .66.47 1.13M13.6 14.4H2.4v-8h11.2zm0-9.6H2.4V3.2h11.192z" clipRule="evenodd"/></> }
    }
};

export function ScheduleUnpublished({
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

ScheduleUnpublished.displayName = "ScheduleUnpublished";
