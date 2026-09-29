import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M14.384 11.799a.96.96 0 0 0-.697-.273H9.775q-.416 0-.697.273a.9.9 0 0 0-.28.675q0 .402.28.675.282.272.697.272h3.058a5.8 5.8 0 0 1 1.655-1.504 1 1 0 0 0-.104-.118"/><path fill="currentColor" d="M3.907 20.052V7.832L2 3.805 3.76 3l2.3 4.784h11.345L19.702 3l1.76.805-1.907 4.027v3.545a6 6 0 0 0-1.956-.324V9.68H5.863v8.479h6.053c.184.69.498 1.331.916 1.894z"/><path fill="currentColor" fillRule="evenodd" d="M22 16.737C22 19.09 20.03 21 17.599 21s-4.401-1.909-4.401-4.263 1.97-4.263 4.401-4.263S22 14.383 22 16.737m-1.194-1.114-3.78 3.557-2.374-2.235.953-.898 1.405 1.323 2.826-2.66z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M9.907 7.834a.76.76 0 0 0-.557-.225H6.22a.76.76 0 0 0-.557.225.76.76 0 0 0-.225.557q0 .333.225.557.224.225.557.225h2.447A4.7 4.7 0 0 1 9.99 7.931a1 1 0 0 0-.084-.097"/><path fill="currentColor" d="M1.526 14.65V4.557L0 1.232 1.408.567l1.839 3.951h9.076L14.16.567l1.409.665-1.526 3.325v2.928a4.7 4.7 0 0 0-1.564-.267V6.083H3.09v7.002h4.843c.147.571.398 1.1.733 1.565z"/><path fill="currentColor" fillRule="evenodd" d="M16 11.912a3.52 3.52 0 1 1-7.042 0 3.52 3.52 0 0 1 7.042 0m-.955-.92L12.02 13.93l-1.9-1.846.763-.741 1.124 1.092 2.261-2.197z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M22 16.737C22 19.09 20.03 21 17.599 21h-.004c-2.429-.002-4.397-1.91-4.397-4.263s1.968-4.261 4.397-4.263h.004c2.43 0 4.401 1.909 4.401 4.263m-1.194-1.114-3.78 3.557-2.374-2.235.953-.898 1.405 1.323 2.826-2.66z" clipRule="evenodd"/><path fill="currentColor" d="M3.907 7.832v12.22h8.889a5.57 5.57 0 0 1-.02-6.631h-3a.96.96 0 0 1-.698-.272.9.9 0 0 1-.28-.675q0-.403.28-.675a.96.96 0 0 1 .697-.273h3.912c.302 0 .583.125.772.353a6 6 0 0 1 3.136-.873h.005a6 6 0 0 1 1.955.323V7.83l1.907-4.026L19.702 3l-2.299 4.784H6.06L3.76 3 2 3.805z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M16 11.912a3.52 3.52 0 0 1-3.52 3.52h-.004a3.52 3.52 0 0 1 0-7.04h.003A3.52 3.52 0 0 1 16 11.911m-.955-.92L12.02 13.93l-1.9-1.846.763-.741 1.124 1.092 2.261-2.197z" clipRule="evenodd"/><path fill="currentColor" d="M1.526 4.557V14.65h7.11a4.7 4.7 0 0 1-.882-2.75 4.7 4.7 0 0 1 .867-2.727h-2.4a.76.76 0 0 1-.558-.225.76.76 0 0 1-.225-.557q0-.332.225-.557a.76.76 0 0 1 .557-.225h3.13c.24 0 .466.103.617.291a4.7 4.7 0 0 1 2.51-.721h.003c.548 0 1.075.094 1.564.267V4.557l1.526-3.325-1.408-.665-1.84 3.951H3.248L1.408.567 0 1.232z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M14.384 11.799a.96.96 0 0 0-.697-.273H9.775q-.416 0-.697.273a.9.9 0 0 0-.28.675q0 .402.28.675.282.272.697.272h3.058a5.8 5.8 0 0 1 1.655-1.504 1 1 0 0 0-.104-.118"/><path fill="currentColor" d="M3.907 20.052V7.832L2 3.805 3.76 3l2.3 4.784h11.345L19.702 3l1.76.805-1.907 4.027v3.545a6 6 0 0 0-1.956-.324V9.68H5.863v8.479h6.053c.184.69.498 1.331.916 1.894z"/><path fill="var(--icon-success)" fillRule="evenodd" d="M22 16.737C22 19.09 20.03 21 17.599 21s-4.401-1.909-4.401-4.263 1.97-4.263 4.401-4.263S22 14.383 22 16.737m-1.194-1.114-3.78 3.557-2.374-2.235.953-.898 1.405 1.323 2.826-2.66z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M9.907 7.834a.76.76 0 0 0-.557-.225H6.22a.76.76 0 0 0-.557.225.76.76 0 0 0-.225.557q0 .333.225.557.224.225.557.225h2.447A4.7 4.7 0 0 1 9.99 7.931a1 1 0 0 0-.084-.097"/><path fill="currentColor" d="M1.526 14.65V4.557L0 1.232 1.408.567l1.839 3.951h9.076L14.16.567l1.409.665-1.526 3.325v2.928a4.7 4.7 0 0 0-1.564-.267V6.083H3.09v7.002h4.843c.147.571.398 1.1.733 1.565z"/><path fill="var(--icon-success)" fillRule="evenodd" d="M16 11.912a3.52 3.52 0 1 1-7.042 0 3.52 3.52 0 0 1 7.042 0m-.955-.92L12.02 13.93l-1.9-1.846.763-.741 1.124 1.092 2.261-2.197z" clipRule="evenodd"/></> }
    }
};

export function SettleOrder({
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

SettleOrder.displayName = "SettleOrder";
