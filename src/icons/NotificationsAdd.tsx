import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M9.588 21.413Q10.175 22 11 22t1.412-.587T13 20H9q0 .824.588 1.413M3 17v2h16v-2h-2v-2.075a7 7 0 0 1-1.05-.275 5 5 0 0 1-.95-.45V17H7v-7q0-1.65 1.175-2.825T11 6q.425 0 .838.088.412.087.787.262.225-.475.525-.887.3-.414.675-.763a3.4 3.4 0 0 0-.637-.288A17 17 0 0 0 12.5 4.2v-.7q0-.625-.437-1.062A1.45 1.45 0 0 0 11 2q-.625 0-1.062.438A1.45 1.45 0 0 0 9.5 3.5v.7q-2 .5-3.25 2.113T5 10v7z" clipRule="evenodd"/><path fill="currentColor" d="M17 13v-3h-3V8h3V5h2v3h3v2h-3v3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.67 15.53q.47.47 1.13.47t1.13-.47.47-1.13H5.2q0 .66.47 1.13M.4 12v1.6h12.8V12h-1.6v-1.66a5.5 5.5 0 0 1-.84-.22 4 4 0 0 1-.76-.36V12H3.6V6.4q0-1.32.94-2.26A3.08 3.08 0 0 1 6.8 3.2q.34 0 .67.07t.63.21q.18-.38.42-.71t.54-.61a2.7 2.7 0 0 0-.51-.23q-.27-.09-.55-.17V1.2q0-.5-.35-.85A1.16 1.16 0 0 0 6.8 0q-.5 0-.85.35t-.35.85v.56A4.6 4.6 0 0 0 3 3.45Q2 4.74 2 6.4V12z" clipRule="evenodd"/><path fill="currentColor" d="M11.6 8.8V6.4H9.2V4.8h2.4V2.4h1.6v2.4h2.4v1.6h-2.4v2.4z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M9.588 21.413Q10.175 22 11 22t1.412-.587T13 20H9q0 .824.588 1.413" clipRule="evenodd"/><path fill="currentColor" d="M17 13v-3h-3V8h3V5h2v3h3v2h-3v3z"/><path fill="currentColor" fillRule="evenodd" d="M17 13v-3h-3V8h3V5h2v3h3v2h-3v3z" clipRule="evenodd"/><path fill="currentColor" d="M3 19v-2h2v-7q0-2.074 1.25-3.687T9.5 4.2v-.7q0-.625.438-1.062A1.45 1.45 0 0 1 11 2q.624 0 1.063.438.437.436.437 1.062v.7q.35.1.688.212.326.11.617.277a6.04 6.04 0 0 0-1.832 4.341A6.06 6.06 0 0 0 17 15.002V17h2v2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.67 15.53q.47.47 1.13.47t1.13-.47.47-1.13H5.2q0 .66.47 1.13" clipRule="evenodd"/><path fill="currentColor" d="M11.6 8.8V6.4H9.2V4.8h2.4V2.4h1.6v2.4h2.4v1.6h-2.4v2.4z"/><path fill="currentColor" fillRule="evenodd" d="M11.6 8.8V6.4H9.2V4.8h2.4V2.4h1.6v2.4h2.4v1.6h-2.4v2.4z" clipRule="evenodd"/><path fill="currentColor" d="M.4 13.6V12H2V6.4q0-1.66 1-2.95a4.6 4.6 0 0 1 2.6-1.69V1.2q0-.5.35-.85T6.8 0t.85.35.35.85v.56q.28.08.55.17.261.088.494.22a4.83 4.83 0 0 0-1.466 3.473 4.85 4.85 0 0 0 4.022 4.778V12h1.6v1.6z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M9.588 21.413Q10.175 22 11 22t1.412-.587T13 20H9q0 .824.588 1.413M3 17v2h16v-2h-2v-2.075a7 7 0 0 1-1.05-.275 5 5 0 0 1-.95-.45V17H7v-7q0-1.65 1.175-2.825T11 6q.425 0 .838.088.412.087.787.262.225-.475.525-.887.3-.414.675-.763a3.4 3.4 0 0 0-.637-.288A17 17 0 0 0 12.5 4.2v-.7q0-.625-.437-1.062A1.45 1.45 0 0 0 11 2q-.625 0-1.062.438A1.45 1.45 0 0 0 9.5 3.5v.7q-2 .5-3.25 2.113T5 10v7z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M17 13v-3h-3V8h3V5h2v3h3v2h-3v3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.67 15.53q.47.47 1.13.47t1.13-.47.47-1.13H5.2q0 .66.47 1.13M.4 12v1.6h12.8V12h-1.6v-1.66a5.5 5.5 0 0 1-.84-.22 4 4 0 0 1-.76-.36V12H3.6V6.4q0-1.32.94-2.26A3.08 3.08 0 0 1 6.8 3.2q.34 0 .67.07t.63.21q.18-.38.42-.71t.54-.61a2.7 2.7 0 0 0-.51-.23q-.27-.09-.55-.17V1.2q0-.5-.35-.85A1.16 1.16 0 0 0 6.8 0q-.5 0-.85.35t-.35.85v.56A4.6 4.6 0 0 0 3 3.45Q2 4.74 2 6.4V12z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M11.6 8.8V6.4H9.2V4.8h2.4V2.4h1.6v2.4h2.4v1.6h-2.4v2.4z"/></> }
    }
};

export function NotificationsAdd({
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

NotificationsAdd.displayName = "NotificationsAdd";
